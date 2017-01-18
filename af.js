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
  })
}

module.exports = af
