// program = [ { type: 'DEC_ASSIGN',
//     id: { type: 'ID', value: 'bar' },
//     exp: { type: 'STRING', value: 'what up' } },
//   { type: 'DEC_ASSIGN',
//     id: { type: 'ID', value: 'bar' },
//     exp: { type: 'STRING', value: 'naw' } } ]

// program = [ { type: 'DEC_ASSIGN',
//     id: { type: 'ID', value: 'bar' },
//     exp: { type: 'STRING', value: 'what up' } },
//   { type: 'DEC_ASSIGN',
//     id: { type: 'ID', value: 'foo' },
//     exp: 
//      { type: 'LAMBDA',
//        arguments: [ { type: 'ID', value: 'a' }, { type: 'ID', value: 'b' } ],
//        statements: 
//         [ { type: 'DEC_ASSIGN',
//             id: { type: 'ID', value: 'bar' },
//             exp: { type: 'STRING', value: 'hey' } },
//           { type: 'DEC_ASSIGN',
//             id: { type: 'ID', value: 'foo' },
//             exp: { type: 'STRING', value: 'Not to much' } } ] } },
//   { type: 'DEC_ASSIGN',
//     id: { type: 'ID', value: 'notfoo' },
//     exp: { type: 'STRING', value: 'just chillen' } } ]



let anlysis = (statements, current_declartions = new Set()) => {
  let declartions = new Set()
  statements.map((statement) => {
    
    if (statement.type == "DEC_ASSIGN") {

      if (statement.exp.type == "LAMBDA") {
        declaredScope = new Set([declartions, current_declartions])
        anlysis(statement.exp.statements, declaredScope)
      }

      if (declartions.has(statement.id.value)) throw `${statement.id.value} declared twice`
      declartions.add(statement.id.value)
    }

    if (statement.type == "OPERATOR"){}

  })
}


anlysis(program)