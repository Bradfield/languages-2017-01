const vm = require('../../vm')

// const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])



vm.evalParsedObject({
  // other 
  constPool: [7, 7] ,
  code: vm.assemble([
    'LOAD_CONST', 0, // Load 7 into local stack (from const pool)
    'LOAD_CONST', 1, // Load 5 into local stack (from const pool)
    'equal', // pop, pop compare and push a bool
    'PRINT', // Print top of stack (12)
  ])
})
