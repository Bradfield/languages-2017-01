let foo = (a, b) => {
  let bar = "hey";
};

module.exports = {
  testCase: `
  let foo = (a, b) => {
    let bar = "hey";
  };`,
  expectedOutput: [ { type: 'DEC_ASSIGN',
    id: { type: 'ID', value: 'foo' },
    exp:
     { type: 'EXP',
       value:
        { type: 'LAMBDA',
          arguments:
           [ { type: 'EXP',
               value: { type: 'ID', value: 'a' },
               left: null,
               right: null },
             { type: 'EXP',
               value: { type: 'ID', value: 'b' },
               left: null,
               right: null } ],
          statements:
           [ { type: 'DEC_ASSIGN',
               id: { type: 'ID', value: 'bar' },
               exp:
                { type: 'EXP',
                  value: { type: 'STRING', value: 'hey' },
                  left: null,
                  right: null } } ] },
       left: null,
       right: null } } ]
}
