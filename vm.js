const instructionToByteCode = {
  local_load: 0x10, // Push argument to local stack
  add: 0x11, // Pop two items from local stack, add, and push result
  print: 0x12, // Pop one item from local stack, write to stdout
  equal: 0x13, // Pop two items from local stack. compare, and push bool
  jump: 0x14, // Set instruction pointer to argument
  halt: 0xff, // Stop execution
};

const byteCodeToName = {}
for (let key of Object.keys(instructionToByteCode)){
  byteCodeToName[instructionToByteCode[key]] = key
}

const getByteCodeForName = (name) => {
  return new Buffer([instructionToByteCode[name]]);
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

  evalParsedObject: (w) => {
    // console.log(w.code);
    w.ip = w.entry || 0;
    w.local_stack = w.local_stack || [];
    w.print = w.print || console.log.bind(console);
    w.bytecode = w.code[w.ip];

    while (w.bytecode != instructionToByteCode.halt && w.ip < w.code.length) {
      w.ip = w.ip + 1;
      vm.dispatch(w);
      w.bytecode = w.code[w.ip]
    }
  },

  dispatch: (w) => {
    let idx, arg;

    switch(byteCodeToName[w.bytecode]) {
      case 'local_load':
        idx = new Buffer([w.code[w.ip++], w.code[w.ip++]]) // Monkeying
        arg = w.const[idx.readUInt16BE(0)]
        w.local_stack.push(arg);
        break;
      case 'add':
        w.local_stack.push(w.local_stack.pop() + w.local_stack.pop());
        break;
      case 'print':
        w.print(w.local_stack.pop())
        break;
      case 'equal':
        w.local_stack.push(w.local_stack.pop() == w.local_stack.pop());
        break;
      case 'jump':
        idx = new Buffer([w.code[w.ip++], w.code[w.ip++]]); // Monkeying
        w.ip = idx.readUInt16BE(0);
        break;
      default:
        throw "Unknown instruction " + w.bytecode.toString()
    }
  },
};

module.exports = vm;
// console.log(assemble(
//   [
//     'local_load', 1,
//     'local_load', 2,
//   ]
// ));
