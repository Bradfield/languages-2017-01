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
  : num -> af.exp($1, null, null)
  | string -> af.exp($1, null, null)
  | lambda -> af.exp($1, null, null)
  | id -> af.exp($1, null, null)
  | exp operator exp -> af.exp($2, $1, $3)
  | OPAREN exp CPAREN -> $2
  ;

operator
  : MINUS
  | PLUS
  | MULTIPLY
  | DIVIDE
  ;


lambda
  : OPAREN arguments CPAREN ROCKET OCURLY statements CCURLY -> af.lambda($2, $6)
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
