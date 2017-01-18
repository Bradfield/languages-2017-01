/*
$ node dev/ast.js <<< 'let foo = 123;'
{ type: 'ASSIGN',
  id: { type: 'ID', name: 'foo' },
  exp: { type: 'NUM', value: 123 } }
*/

const fs = require('fs')
const { resolve } = require('path')

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
console.log("=============== final parse tree ===============")
console.log(parser.parse(stdinStr, factory))
// console.log(parser.generate())
