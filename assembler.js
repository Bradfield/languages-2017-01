const {instructionToByteCode} = require('./byteCodes')

const getByteCodeForName = (name) => {
  const bytecode = instructionToByteCode[name];
  if (!bytecode) {
    throw "Unknown instruction " + name;
  }
  return new Buffer([bytecode]);
}

let assemble = (strs_and_ints) => {
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
}
module.exports = assemble
if (require.main === module){
  console.log(assemble([
    // x = 3
    /* 0 */ 'LOAD_CONST', 0,
    /* 3 */ 'local_store_env', 1, // store into the local env object the key pair
    // y = 4
    /* 6 */ 'LOAD_CONST', 2,
    /* 9 */ 'local_store_env', 3,
    // PRINT(x + y)
    /* 12 */ 'LOAD_CONST_env', 1, // retrieve the value of variable from the local env object
    /* 15 */ 'LOAD_CONST_env', 3,
    /* 18 */ 'ADD',
    /* 21 */ 'PRINT',
  ]))
}