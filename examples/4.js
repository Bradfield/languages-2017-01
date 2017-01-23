module.exports = {
  testCase: `a(36, "bob");`,
  expectedOutput: [ { type: 'FUNC_CALL',
    name: 'a',
    arguments:
     [ { type: 'EXP',
         value: { type: 'NUM', value: 36 },
         left: null,
         right: null },
       { type: 'EXP',
         value: { type: 'STRING', value: 'bob' },
         left: null,
         right: null } ] } ]
}
