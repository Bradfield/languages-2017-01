const assemble = require('./assembler')
const {instructionToByteCode, byteCodeToName} = require('./byteCodes')
const vm = {
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
      w.bytecode = w.code[w.ip];
    }
  },

  dispatch: (w) => {
    let idx, arg, key, val;

    switch(byteCodeToName[w.bytecode]) {
      case 'LOAD_CONST':
        idx = new Buffer([w.code[w.ip++], w.code[w.ip++]]); // Monkeying
        arg = w.constPool[idx.readUInt16BE(0)];
        w.localStack.push(arg);
        break;
      case 'ADD':
        w.localStack.push(w.localStack.pop() + w.localStack.pop());
        break;
      case 'PRINT':
        w.print(w.localStack.pop());
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
      case 'STORE_ENV':
        idx = new Buffer([w.code[w.ip++], w.code[w.ip++]]); // Monkeying
        key = w.constPool[idx.readUInt16BE(0)];
        val = w.localStack.pop();
        w.localEnv[key] = val;
        break;
      case 'LOAD_ENV':
        idx = new Buffer([w.code[w.ip++], w.code[w.ip++]]);
        key = w.constPool[idx.readUInt16BE(0)];
        w.localStack.push(w.localEnv[key]);
        break;
      default:
        throw "Unknown instruction " + w.bytecode.toString();
    }
  },
  assemble
};

module.exports = vm;
