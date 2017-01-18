/* name of the param passed into the action blocks
   af = Ast Factory */
%parse-param af

/* the rule to start with */
%start program

/* rules */
%%

program
	: statements EOF { return $1 }
	;

statements
  : statement SEMICOLON -> [$1] 
  | statements statement SEMICOLON -> $1.concat($2)
  ; 

statement
  : LET id ASSIGN exp -> af.declareAssign($2, $4)
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
