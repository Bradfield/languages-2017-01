// what_to_execute = {
//     "instructions": [("LOAD_VALUE", 0),  # the first number
//                      ("LOAD_VALUE", 1),  # the second number
//                      ("ADD_TWO_VALUES", None),
//                      ("PRINT_ANSWER", None)],
//     "numbers": [7, 5] }

const vm = require('../../vm')

// const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])



vm.evalParsedObject({
  // other 
  constPool: [7, 5] ,
  code: vm.assemble([
    'LOAD_CONST', 0, // Load 7 into local stack (from const pool)
    'LOAD_CONST', 1, // Load 5 into local stack (from const pool)
    'ADD', // Pop 7, pop 5, ADD together, push 12 onto stack
    'PRINT', // Print top of stack (12)
  ])
})
