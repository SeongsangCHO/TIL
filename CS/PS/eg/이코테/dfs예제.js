let graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];

let visited = new Array(9).fill(false);

const dfs = (graph, v, visited) =>{
  visited[v] = true;
  console.log(v +" ");
  for(let i of graph[v]){
    if (visited[i] != true)
      dfs(graph, i, visited);
  }
}

dfs(graph, 1, visited);