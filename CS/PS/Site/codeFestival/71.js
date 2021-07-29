const graph = {
  "A":["B"],
  "B":["A","C"],
  "C":["B","D"],
  "D":["C","F","E"],
  "E":["D"],
  "F":["D"],
};

const solution = (graph) => {
  //객체 키 접근
  let answer = [];
  let len = Object.keys(graph).length;
  let visited = new Map();
  for (let key in graph) {
    visited.set(key, false);
  }

  function dfs(graph, v, visited) {
    if (visited.get(v) == true){return ;}
    visited.set(v, true);
    answer.push(v);
    for (let i = 0; i < graph[v].length; i++) {
      if (visited.get(graph[v][i]) == false) {
        dfs(graph, graph[v][i], visited);
      }
    }
  }

  for (let i in graph) {
    dfs(graph, i, visited);
  }
  return answer.join(' ');
};

console.log(solution(graph));
