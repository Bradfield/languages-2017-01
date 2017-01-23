const instructionToByteCode = {
  LOAD_CONST: 0x10, // Push argument to local stack
  ADD: 0x11, // Pop two items from local stack, add, and push result
  PRINT: 0x12, // Pop one item from local stack, write to stdout
  EQUAL: 0x13, // Pop two items from local stack. compare, and push bool
  JUMP: 0x14, // Set instruction pointer to argument
  SUB: 0x15, // Pop two items from local stack, add, and push result
  HALT: 0xff, // Stop execution
  LOAD_CONST_env: 0x15, // set a new key-value pair into local env object
  local_store_env: 0x16, // get the value corresponding to a key from the env object
};

const byteCodeToName = {}
for (let key of Object.keys(instructionToByteCode)){
  byteCodeToName[instructionToByteCode[key]] = key
}

const getByteCodeForName = (name) => {
  const bytecode = instructionToByteCode[name];
  if (!bytecode) {
    throw "Unknown instruction " + name;
  }
  return new Buffer([bytecode]);
}

const vm = {
  assemble: (strs_and_ints) => {
    let buf = new Buffer(0);

    for (let x of strs_and_ints) {
      if(typeof x == 'string'){
        buf = Buffer.concat([buf, getByteCodeForName(x)]);
      } else {
        let int = new Buffer(2);
        int.writeUInt16BE(x, 0);
        buf = Buffer.concat([buf, int]);
        // expect to be int
        // need to be encoded into a 2 byte big endian
      }
    }

    return buf;
  },

  // add callStack to the world object
  // move the localStack and localEnv into a frame object
  // create an initial frame for the callStack object
  // change localEnv and stack to be computed dynamically
  evalParsedObject: w => {
    // console.log(w.code);
    w.ip = w.entry || 0;
    w.print = w.print || console.log.bind(console);
    w.bytecode = w.code[w.ip];
    w.callStack = [{
      name: 'main',
      returnAddr: null,
      localStack: [],
      localEnv: {},
    }];
    Object.defineProperty(w, "localStack", { get: function () { 
      return w.callStack[w.callStack.length - 1].localStack; 
    }});
    Object.defineProperty(w, "localEnv", { get: function () { 
      return w.callStack[w.callStack.length - 1].localEnv; 
    }});

    while (w.bytecode != instructionToByteCode.halt && w.ip < w.code.length) {
      w.ip = w.ip + 1;
      vm.dispatch(w);
      w.bytecode = w.code[w.ip]
    }
  },

  dispatch: (w) => {
    let idx, arg, key, val;

    switch(byteCodeToName[w.bytecode]) {
      case 'LOAD_CONST':
        idx = new Buffer([w.code[w.ip++], w.code[w.ip++]]) // Monkeying
        arg = w.constPool[idx.readUInt16BE(0)]
        w.localStack.push(arg);
        break;
      case 'ADD':
        w.localStack.push(w.localStack.pop() + w.localStack.pop());
        break;
      case 'PRINT':
        w.print(w.localStack.pop())
        break;
      case 'EQUAL':
        w.localStack.push(w.localStack.pop() == w.localStack.pop());
        break;
      case 'JUMP':
        idx = new Buffer([w.code[w.ip++], w.code[w.ip++]]); // Monkeying
        w.ip = idx.readUInt16BE(0);
        break;
      case 'SUB':
        let rightOperand = w.localStack.pop();
        let leftOperand = w.localStack.pop();
        w.localStack.push(leftOperand - rightOperand);
      case 'local_store_env':
        idx = new Buffer([w.code[w.ip++], w.code[w.ip++]]) // Monkeying
        key = w.constPool[idx.readUInt16BE(0)];
        val = w.localStack.pop();
        w.localEnv[key] = val;
        break;
      case 'LOAD_CONST_env':
        idx = new Buffer([w.code[w.ip++], w.code[w.ip++]]);
        key = w.constPool[idx.readUInt16BE(0)];
        w.localStack.push(w.localEnv[key]);
        break;
      default:
        throw "Unknown instruction " + w.bytecode.toString()
    }
  },
};

module.exports = vm;
// console.log(assemble(
//   [
//     'LOAD_CONST', 1,
//     'LOAD_CONST', 2,
//   ]
// ));
