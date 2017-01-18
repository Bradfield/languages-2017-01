module.exports = {
  testCase: `let foo = "Hello";`,
  expectedOutput: [ { type: 'DEC_ASSIGN',
    id: { type: 'ID', value: 'foo' },
    exp:
     { type: 'EXP',
       value: { type: 'STRING', value: 'Hello' },
       left: null,
       right: null } } ]
}
