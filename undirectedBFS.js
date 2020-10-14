

const m =
  [ [ 'O', '_', '_', '_'],
    [ '_', 'X', '_', '_' ],
    [ 'X', '_', 'X', '_' ],
    [ '_', '_', 'T', '_' ]]
let start;
let finish; 

for (let i=0; i < m.length; i++){
    for (let j=0; j <= i; j++){
        if (m[i][j] === "O"){
            start = [i, j]
        } else if(m[i][j] === "T"){
            finish = [i, j]
        }
    }
}
let successors = (root, m) => {
  let connectedCells = [
    [root[0] - 1, root[1]],
    [root[0], root[1] - 1],
    [root[0] + 1, root[1]],
    [root[0], root[1] + 1]
  ]
  const validCells = connectedCells.filter(
    (cell) => (
      cell[0] >= 0 && cell[0] < m.length 
      && cell[1] >= 0 && cell[1] < m[0].length)
  )
  const successors = validCells.filter(
    (cell) => (m[cell[0]][cell[1]] !== "X")
  )
  return successors
}

const buildPath = (traversalTree, to) => {
  let path = [to]
  let parent = traversalTree[to]
  while (parent) {
    path.push(parent)
    parent = traversalTree[parent]
  }
  return path.reverse()
}

const bfs = (from, to) => {
  let traversalTree = []
  let visited = new Set()
  let queue = []
  queue.push(from)

  while (queue.length) {
    let subtreeRoot = queue.shift()
    visited.add(subtreeRoot.toString())

    if (subtreeRoot.toString() == to.toString()) return buildPath(traversalTree, to)

    for (child of successors(subtreeRoot, m)) {
      if (!visited.has(child.toString())){
        traversalTree[child] = subtreeRoot
        queue.push(child)
      }
    }
  }
}

console.log(bfs(start, finish).length - 1)