var fs = require("fs");
var input = fs.readFileSync("/dev/stdin").toString().split("\n")

function solution(input) {
  const n = parseInt(input[0]);
  let answer = -1;
  let graph = new Array(n + 1);
  let visited = new Array(n + 1).fill(false);

  for (let i = 0; i < n + 1; i++) {
    graph[i] = new Array(0);
  }

  input = input.slice(2);
  for (let v of input) {
    let [a, b] = v.split(" ").map((v) => Number(v));
    graph[a].push(b);
  }

  const dfs = (node, line) => {
    if (visited[node] === true) {
      return;
    }
    visited[node] = true;
    answer++;
    for (let i = 0; i < line.length; i++) {
      dfs(line[i], graph[line[i]]);
    }
  };
  dfs(1, graph[1]);
  console.log(answer.toString());
}

solution(input);
