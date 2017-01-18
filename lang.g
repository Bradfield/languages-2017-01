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
  : statement -> [$1] 
  | statements statement -> $1.concat($2)
  ; 

statement
  : declaration_assignment SEMICOLON
  | id OPAREN arguments CPAREN SEMICOLON -> af.funcCall($1, $3)
  ;

arguments
  : exp -> [$1]
  | arguments COMMA exp -> $1.concat($3)
  ;

declaration_assignment
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
