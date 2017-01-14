/*
$ node dev/tokenize.js <<< '1 23 -45'
NUM 1
NUM 23
NUM -45
*/

const fs = require('fs')
const { resolve } = require('path')

// input to lex
const stdinStr = fs.readFileSync('/dev/stdin', 'utf8')
// lex program source
const lexSrcStr = fs.readFileSync(resolve(__dirname, '../lang.l'), 'utf8')

// create lexer instance
const JisonLex = require('jison-lex')
const lexer = JisonLex(lexSrcStr)

// lex the input
lexer.setInput(stdinStr)
let tokenClass
while (tokenClass = lexer.lex(), tokenClass != 'EOF')
  console.log(tokenClass, lexer.yytext)
