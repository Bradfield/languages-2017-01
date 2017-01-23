const vm = require('../../vm')

// const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

// Should PRINT 4
vm.evalParsedObject({
  // other 
  constPool: [3, 4] ,
  code: vm.assemble([
    /* 0 */ 'jump', 15, // Jump to instruction at index 5 of the code array
    /* 3 */ 'LOAD_CONST', 0,
    /* 6 */ 'PRINT',
    /* 7 */ 'LOAD_CONST', 0,
    /* 10 */ 'PRINT',
    /* 11 */ 'LOAD_CONST', 0,
    /* 14 */ 'PRINT',
    /* 15 */ 'LOAD_CONST', 1, 
    /* 18 */ 'PRINT' 
  ])
})
