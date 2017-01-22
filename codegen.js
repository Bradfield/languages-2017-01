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

module.exports = postOrder
