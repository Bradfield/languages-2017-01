const vm = require('../../vm')

// const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

// Should print 4
vm.evalParsedObject({
  // other 
  const: [3, 4] ,
  code: vm.assemble([
    /* 0 */ 'jump', 15, // Jump to instruction at index 5 of the code array
    /* 3 */ 'local_load', 0,
    /* 6 */ 'print',
    /* 7 */ 'local_load', 0,
    /* 10 */ 'print',
    /* 11 */ 'local_load', 0,
    /* 14 */ 'print',
    /* 15 */ 'local_load', 1, 
    /* 18 */ 'print' 
  ])
})
