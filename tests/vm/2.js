const vm = require('../../vm')

// const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])



vm.evalParsedObject({
  // other 
  const: [7, 7] ,
  code: vm.assemble([
    'local_load', 0, // Load 7 into local stack (from const pool)
    'local_load', 1, // Load 5 into local stack (from const pool)
    'equal', // pop, pop compare and push a bool
    'print', // Print top of stack (12)
  ])
})
