const vm = require('../../vm')

// const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

// Should print 4
vm.evalParsedObject({
  // other
  const: [3, 'x', 4, 'y'] ,
  code: vm.assemble([
    // x = 3
    /* 0 */ 'local_load', 0,
    /* 3 */ 'local_store_env', 1, // store into the local env object the key pair
    // y = 4
    /* 6 */ 'local_load', 2,
    /* 9 */ 'local_store_env', 3,
    // print(x + y)
    /* 12 */ 'local_load_env', 1, // retrieve the value of variable from the local env object
    /* 15 */ 'local_load_env', 3,
    /* 18 */ 'add',
    /* 21 */ 'print',
  ])
})
