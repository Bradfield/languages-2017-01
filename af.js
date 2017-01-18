// af = Ast Factory

const af = {
	id: name => ({
		type: 'ID',
		name,
	}),
  number: n => ({
		type: 'NUM',
		value: Number(n),
	}),
  declareAssign: (id, exp) => ({
    type: 'ASSIGN',
    id,
    exp,
  })
}

module.exports = af
