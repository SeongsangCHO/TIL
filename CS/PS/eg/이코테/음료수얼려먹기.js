let map = [
  [0, 1, 1, 1, 0],
  [1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0],
];

let n = 4;
let m = 5;

let visited = new Array(n).fill("").map((value) => {
  return new Array(m).fill(false);
});


const dfs  = (x, y) => {
  if (x <= -1 || x>= n || y <= -1 || y >= m)
    return false;
  if (map[x][y] == 0){
    visited[x][y] = true;
    map[x][y] = 1;
    dfs(x, y + 1);
    dfs(x, y - 1);
    dfs(x + 1, y);
    dfs(x - 1, y);
    return true;
  }
  return false;
}

let count = 0;
let [x, y] = [0, 0];

for(let i = 0; i < n; i++){
  for(let j = 0; j < m; j++){
    if (dfs(i, j) == true){
      count++;
    }
  }
}
console.log(count);
