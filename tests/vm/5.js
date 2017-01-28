const vm = require('../../vm')


vm.evalParsedObject({
	entry: 5,
  constPool: ['x', [0, [0], 'f'], 42],
  code: vm.assemble([
  	"LOAD_ENV", 0,
  	"PRINT",
  	"RETURN",
  	"LOAD_CONST", 2,
  	"CALL", 1
  ])
})
