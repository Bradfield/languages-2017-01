// af = Ast Factory

const af = {
	id: value => ({
		type: 'ID',
		value,
	}),
  number: n => ({
		type: 'NUM',
		value: Number(n),
	}),
  declareAssign: (id, exp) => ({
    type: 'DEC_ASSIGN',
    id,
    exp,
  }),
  string: str => ({
    type: 'STRING',
    value: JSON.parse(str)
  }),
  funcCall: (id, arguments) => ({
    type: "FUNC_CALL",
    name: id.value,
    arguments
  }),
  lambda: (arguments, statements) => ({
    type: 'LAMBDA',
    arguments,
    statements
  }),
  operation: (left, op, right) => ({
    type: "OPERATION",
    left,
    op, 
    right
  })
}

/*
{ type: program,
  statements: [
    { 
      type: 'DEC_ASSIGN',
      id: { type: 'ID', value: 'foobar' },
      exp: { type: 'NUM', value: 23 } 
    },
    { 
      type: 'DEC_ASSIGN',
      id: { type: 'ID', value: 'foo' },
      exp: { type: 'STRING', value: 'Hello World' } 
    },
    { 
      type: 'DEC_ASSIGN',
      id: { type: 'ID', value: 'bar' },
      exp: { type: 'NUM', value: 10 } 
    }
  ]
}
let foo = "Hello World"; let bar = 10; let foobar = 23;
*/
module.exports = af
