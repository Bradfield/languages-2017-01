const instructionToByteCode = {
  LOAD_CONST: 0x10, // Push argument to local stack
  ADD: 0x11, // Pop two items from local stack, add, and push result
  PRINT: 0x12, // Pop one item from local stack, write to stdout
  EQUAL: 0x13, // Pop two items from local stack. compare, and push bool
  JUMP: 0x14, // Set instruction pointer to argument
  SUB: 0x15, // Pop two items from local stack, add, and push result
  HALT: 0xff, // Stop execution
  LOAD_ENV: 0x16, // set a new key-value pair into local env object
  STORE_ENV: 0x17, // get the value corresponding to a key from the env object
  RETURN: 0X18,
  CALL: 0X19
};

const byteCodeToName = {}
for (let key of Object.keys(instructionToByteCode)){
  byteCodeToName[instructionToByteCode[key]] = key
}

module.exports = {byteCodeToName, instructionToByteCode}