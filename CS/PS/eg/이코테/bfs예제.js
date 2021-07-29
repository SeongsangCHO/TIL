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
let queue = [];
const bfs = (graph, start, visited) => {
  queue.push(start);

  visited[start] = true;
  while (queue.length != 0){
    let v = queue.shift();
    console.log("v is : "+v);
    for (let i of graph[v]){
    if(visited[i] != true){
        queue.push(i);
        visited[i] = true;
      }
    }
  }
}

bfs(graph, 1, visited);