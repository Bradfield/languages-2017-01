/* name of the param passed into the action blocks
   af = Ast Factory */
%parse-param af

/* the rule to start with */
%start program

/* rules */
%%

program
	: statement EOF { return $1 }
	;

statement
  : LET id ASSIGN exp SEMICOLON -> af.declareAssign($2, $4)
  ;

exp
  : num
  | string
  ;

string
  : STRING -> af.string($1)
  ;

num
  : NUM -> af.number($1)
  ;

id
  : ID -> af.id($1)
  ;
