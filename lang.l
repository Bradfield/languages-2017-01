/* resources
- the tests: https://github.com/zaach/jison-lex/blob/master/tests/regexplexer.js
... blog posts? add something here if you find it!
*/

/* declare macros */

num     [0-9]
number  [\+\-]? {num}+

scomment        \/\/
scomment-char		[^\n] /* anything that *isnt* a newline */
scomment-text		{scomment-char}*\n

/* delcare states
     when in a state, only that state's rules apply */
%x scomment

/* declare rules */
%%

\s+       /* skip whitespace */
{number}  return 'NUM'

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
