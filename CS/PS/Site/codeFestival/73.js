const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

const solution = (input, graph) => {
  let count = -1;
  let start = input[0];
  let end = input[1];
  let queue = [start];
  let visited = [start];

  while (queue.length !== 0) {
    count++;
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      //queue의 0번째 노드를 뽑기
      let node = queue.splice(0, 1);
      if (node == end) {
        return count;
      }
      for(let nextNode in graph[node]){
        console.log(nextNode, graph[node]);
        if(!visited.includes(graph[node][nextNode])){
          visited.push(graph[node][nextNode]);
          queue.push(graph[node][nextNode]);
        }
      }
    }
  }
  return count;
};
console.log(solution(["A", "F"], graph));
