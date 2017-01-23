 module.exports = {
  testCase: `let foo = "Hello"; let bar = "World"; a();`,
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
       right: null } },
  { type: 'FUNC_CALL', name: 'a', arguments: [] } ]
}
