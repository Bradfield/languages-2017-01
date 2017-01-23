const vm = require('../../vm')

// const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

// Should PRINT 4
vm.evalParsedObject({
  // other
  constPool: [3, 'x', 4, 'y'] ,
  code: vm.assemble([
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
  ])
})
