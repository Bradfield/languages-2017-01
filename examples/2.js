module.exports = {
  testCase: `let foo = "Hello"; let bar = "World";`,
  expectedOutput: [ { type: 'DEC_ASSIGN',
    id: { type: 'ID', value: 'foo' },
    exp:
     { type: 'EXP',
       value: { type: 'STRING', value: 'Hello' },
       left: null,
       right: null } },
  { type: 'DEC_ASSIGN',
    id: { type: 'ID', value: 'bar' },
    exp:
     { type: 'EXP',
       value: { type: 'STRING', value: 'World' },
       left: null,
       right: null } } ]
}
