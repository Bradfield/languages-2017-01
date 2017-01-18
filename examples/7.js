module.exports = {
  testCase: `let test = (1 + 3 * (2) - someFunc(1));`,
  expectedOutput: [ { type: 'DEC_ASSIGN',
    id: { type: 'ID', value: 'test' },
    exp:
     { type: 'EXP',
       value: { type: 'OPERATOR', value: 'PLUS' },
       left:
        { type: 'EXP',
          value: { type: 'NUM', value: 1 },
          left: null,
          right: null },
       right:
        { type: 'EXP',
          value: { type: 'OPERATOR', value: 'MULTIPLY' },
          left:
           { type: 'EXP',
             value: { type: 'NUM', value: 3 },
             left: null,
             right: null },
          right:
           { type: 'EXP',
             value: { type: 'OPERATOR', value: 'MINUS' },
             left:
              { type: 'EXP',
                value: { type: 'NUM', value: 2 },
                left: null,
                right: null },
             right:
              { type: 'EXP',
                value:
                 { type: 'FUNC_CALL',
                   name: 'someFunc',
                   arguments:
                    [ { type: 'EXP',
                        value: { type: 'NUM', value: 1 },
                        left: null,
                        right: null } ] },
                left: null,
                right: null } } } } } ]
}