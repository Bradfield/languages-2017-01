/* name of the param passed into the action blocks
   af = Ast Factory */
%parse-param af

%left PLUS MINUS
%left MULTIPLY DIVIDE

%start program


/* the rule to start with */


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
  | operation SEMICOLON
  ;

arguments
  : exp -> [$1]
  | arguments COMMA exp -> $1.concat($3)
  ;

declaration_assignment
  : LET id ASSIGN exp -> af.declareAssign($2, $4)
  ;

exp 
  : operation
  | lambda
  | literal
  ;

literal
  : num
  | string
  | id
  ;

operation
  : exp MINUS exp -> af.operation($1, $2, $3) 
  | exp PLUS exp -> af.operation($1, $2, $3) 
  | exp MULTIPLY exp -> af.operation($1, $2, $3) 
  | exp DIVIDE exp -> af.operation($1, $2, $3) 
  //| operation operation exp -> af.operation($1, $2, $3)
  //| OPAREN operation CPAREN -> $2
  ;

operator
  : MINUS -> af.operator("MINUS")
  | PLUS -> af.operator("PLUS")
  | MULTIPLY -> af.operator("MULTIPLY")
  | DIVIDE -> af.operator("DIVIDE")
  ;

lambda
  : OPAREN parameters CPAREN ROCKET OCURLY statements CCURLY -> af.lambda($2, $6)
  ;

parameters 
  : -> []
  | id -> [$1]
  | parameters COMMA id -> $1.concat($3)
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
