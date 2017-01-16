/*
langauge features:
  First class func () => {}
  signed integers literals 1234 -24
  string literals "hello world" "hello \" yo\"world"
  condition logic
  array literal [1, 2, "hey guys", 4]
  map literal #{key1: val1, 2: #{subkey: subval}# }#
  declartion let
  while loop while(true) {}
  operators + - / *
  comments //
*/

/* resources
- the tests: https://github.com/zaach/jison-lex/blob/master/tests/regexplexer.js
... blog posts? add something here if you find it!
*/

/* declare macros */

num         [0-9]
number      [\+\-]? {num}+
letter      [a-zA-Z]
identifier  {letter}({letter}|{num})*
quote        \"  
string-char [^\"]
string-escape-char \\\"
string-text ({string-escape-char}|{string-char})*

scomment        \/\/
scomment-char		[^\n] /* anything that *isnt* a newline */
scomment-text		{scomment-char}*\n

/* delcare states
     when in a state, only that state's rules apply */
%x scomment string

/* declare rules */
%%

\s+       /* skip whitespace */
{number}     return 'NUM'
true|false   return 'BOOL'
\(           return 'OPAREN'
\)           return 'CPAREN'
\{           return 'OCURLY'
\}           return 'CCURLY'
\[           return 'OBRACKET'
\]           return 'CBRACKET'
if           return 'IF'
else         return 'ELSE'
while        return 'WHILE'
\=\>         return 'ROCKET'
let          return 'LET'
\,           return 'COMMA'
\=           return 'ASSIGN'
{identifier} return 'IDENTIFIER'


{quote}            this.begin('string')
<string>{string-text}{quote}    {this.popState(); yytext = "\"" + yytext; return 'STRING'}


/* single line comments
     when we match the scomment macro
     we don't produce a token but we do push a state */
{scomment}					       this.begin('scomment')
/* then we match scomment-text (the only rule in this state)
     again producing no tokens
     but popping the state we just pushed */
<scomment>{scomment-text}	 this.popState()

<<EOF>>		return 'EOF'        /* turn EOF input into explicit token */
.					return 'INVALID'    /* capture everything else as invalid token */
