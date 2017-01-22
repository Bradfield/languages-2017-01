// [ { type: 'OPERATION',
//     left: 
//      { type: 'OPERATION',
//        left: { type: 'NUM', value: 4 },
//        op: '+',
//        right: 
//         { type: 'OPERATION',
//           left: { type: 'NUM', value: 8 },
//           op: '/',
//           right: { type: 'NUM', value: 2 } } },
//     op: '+',
//     right: { type: 'NUM', value: 7 } } ]
//
// take in pogram 
// for node in the program
//  if node is terminal
//      emit(node)
//  else
//     for node in getChildren(node)
//         codeGen(node)
//
const operationMap = {
  "+": "ADD",
  "-": "SUB",
  "*": "MULT",
  "/": "DIV",
};

let codeGen = (program) => {
  // Get ordered nodes

  // Iterate through ordered nodes and do stuff
  // For each Node
  //   Switch on Node type
  //     Num: create const + load const
  //     String: create const + load const
  //     Operator: output byte code operation

  let orderedNodes = postOrder(program);
  let code = [];
  let constPool = new Map();
  let constPoolIndex = 0;

  for (let node of orderedNodes) {
    switch(node.type) {
      case "OPERATION":
        let operation = operationMap[node.op];
        code.push(operation);
        break;
      case "NUM":
      case "STRING":
        let index;
        if (constPool.has(node.value)) {
          index = constPool.get(node.value);
        } else {
          constPool.set(node.value, constPoolIndex);
          index = constPoolIndex;  
          constPoolIndex++;
        }

        code.push("LOAD_CONST");
        code.push(index);
        break;
      default:
        throw("No bytecode implemented for AST node type: " + node.type);
    }
  }

  constPool = Array.from(constPool.keys());
  return {code, constPool};
}

// function ObjectFile() {
//   this.code = [];
//   this.constantPool = new Map();
// }  

let postOrder = (program) => { 
  let nodes = []
    let traverse = (node) => {
      if (isTerminal(node)){ return nodes.push(node) }
      for(let sub_node of children(node)) {
        traverse(sub_node)
      }
      nodes.push(node)
    }

  for (let node of program) {
    traverse(node)
  }
  return nodes
}

let children = (node) => {
  switch(node.type) {
    case "OPERATION":
      return [node.left, node.right]
      break;
    // case "LAMBDA":
    //   return node.statements
    //   break;
    // case "FUNC_CALL":
    //   return node.arguments
    //   break;
    default:
      throw "Node of type " + node.type + " has no children"
  }
}
let isTerminal = (node) => {
  let terminalNodeTypes = ["NUM", "STRING", "ID",]
  if (terminalNodeTypes.includes(node.type)) {return true}
  return false
}

module.exports = codeGen
