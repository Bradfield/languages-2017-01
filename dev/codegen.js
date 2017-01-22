/*
$ node dev/ast.js <<< 'let foo = 123;'
{ type: 'ASSIGN',
  id: { type: 'ID', name: 'foo' },
  exp: { type: 'NUM', value: 123 } }
*/

const fs = require('fs')
const { resolve } = require('path')
const codegen = require('../codegen')
const vm = require('../vm')
// read input
const stdinStr = fs.readFileSync('/dev/stdin', 'utf8')

// lexer
const lsrc = fs.readFileSync(resolve(__dirname, '../lang.l'), 'utf8')
const lexer = require('jison-lex')(lsrc)

// parser
const psrc = fs.readFileSync(resolve(__dirname, '../lang.g'), 'utf8')
const parser = new require('jison').Parser(psrc)
const factory = require(resolve(__dirname, '../af'))

parser.lexer = lexer
const ast = parser.parse(stdinStr, factory)
console.log("=============== postOrder nodes ===============")
let objectFile = codegen(ast)
objectFile.code.push("PRINT");
console.log(objectFile.code);
objectFile.code = vm.assemble(objectFile.code);
console.log(objectFile.code);
vm.evalParsedObject(objectFile);
// console.log(parser.generate())