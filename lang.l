/* resources
- the tests: https://github.com/zaach/jison-lex/blob/master/tests/regexplexer.js
... blog posts? add something here if you find it!
*/

/* declare macros */

num      [0-9]
number   [\+\-]? {num}+
letter   [a-zA-Z]
id       {letter}({letter}|{num})*
quote    \"
operator [-+/*]

string-char [^\"]
string-escape-char \\\"
string-text ({string-escape-char}|{string-char})*

scomment        \/\/
scomment-char		[^\n] /* anything that *isnt* a newline */
scomment-text		{scomment-char}*\n

/* delcare sublexer states */

%x scomment string

/* declare rules */

%%

\s+       /* skip whitespace */
{number}     return 'NUM'
'('          return 'OPAREN'
')'          return 'CPAREN'
'{'          return 'OCURLY'
'}'          return 'CCURLY'
'['          return 'OBRACKET'
']'          return 'CBRACKET'
'=>'         return 'ROCKET'
','          return 'COMMA'
'='          return 'ASSIGN'
';'          return 'SEMICOLON'
if           return 'IF'
else         return 'ELSE'
while        return 'WHILE'
let          return 'LET'
true|false   return 'BOOL'
{id}         return 'ID'
{operator}		 return 'OP'

/* this.begin('sublexer') puts the lexer into state
   where only rules prefixed by <sublexer> will be
   matched */

{quote}                         this.begin('string')
<string>{string-text}{quote}    {this.popState(); yytext = "\"" + yytext; return 'STRING'}

{scomment}					            this.begin('scomment')
<scomment>{scomment-text}	      this.popState()

<<EOF>>		return 'EOF'        /* turn EOF input into explicit token */
.			return 'INVALID'    /* capture everything else as invalid token */
