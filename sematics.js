// program = [ { type: 'DEC_ASSIGN',
//     id: { type: 'ID', value: 'bar' },
//     exp: { type: 'STRING', value: 'what up' } },
//   { type: 'DEC_ASSIGN',
//     id: { type: 'ID', value: 'bar' },
//     exp: { type: 'STRING', value: 'naw' } } ]

// [ { type: 'DEC_ASSIGN',
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

program = [ { type: 'DEC_ASSIGN',
    id: { type: 'ID', value: 'bar' },
    exp: { type: 'STRING', value: 'what up' } },
  { type: 'DEC_ASSIGN',
    id: { type: 'ID', value: 'a' },
    exp: 
     { type: 'LAMBDA',
       arguments: [ { type: 'ID', value: 'a' }, { type: 'ID', value: 'b' } ],
       statements: 
        [ { type: 'DEC_ASSIGN',
            id: { type: 'ID', value: 'foo' },
            exp: { type: 'NUM', value: 4 } } ] } } ]

let semantics = (statements, scope_declartions = new Set(), outer_declartions = new Set()) => {
  statements.map((statement) => {
    
    if (statement.type == "DEC_ASSIGN") {

      if (statement.exp.type == "LAMBDA") { 
        outer_declartions = new Set([scope_declartions, outer_declartions])
        arguments = new Set(statement.exp.arguments.map(arg => arg.value))
        semantics(statement.exp.statements, arguments, outer_declartions)
      }

      if (scope_declartions.has(statement.id.value)) throw `${statement.id.value} declared twice`
      scope_declartions.add(statement.id.value)
    }

    if (statement.type == "OPERATOR"){}

  })
}

semantics(program)