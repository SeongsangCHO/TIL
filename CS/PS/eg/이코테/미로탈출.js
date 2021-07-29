const map = [
  [1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];

let n = 5;
let m = 6;
let tmp = 0;

let nX;
let nY;
let dirX = [0, 0, -1, 1];
let dirY = [1, -1, 0, 0];
//동서남북

const bfs = (x, y) => {
  let queue = [];

  queue.push([x, y]);
  while (queue.length > 0) {
    [x, y] = queue.pop();
    
    for (let i = 0; i < 4; i++) {
      nX = x + dirX[i];
      nY = y + dirY[i];
      
      if (nX <= -1 || nX >= n || nY <= -1 || nY >= m) continue;
      if (map[nX][nY] === 0) continue;
      if (map[nX][nY] === 1) {
        
        map[nX][nY] = map[x][y] + 1;
        queue.push([nX, nY]);
        
      }
    }
  }
  return map[n - 1][m - 1];
};

console.log(bfs(0, 0));
