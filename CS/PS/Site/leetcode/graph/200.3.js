/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let [m, n] = [grid.length, grid[0].length];
  let answer = 0;
  const posX = [-1, 1, 0, 0]
  const posY = [0, 0, -1, 1]
  function dfs(x, y) {
    for (let i = 0; i < 4; i++) {
      grid[x][y] = '0'
      let movX = posX[i] + x;
      let movY = posY[i] + y;
      if ((movX >= 0 && movX < m) && (movY >= 0 && movY < n)
        && grid[movX][movY] == '1') {
        dfs(movX, movY);
      } else {
        continue
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        dfs(i, j);
        answer++
      }
    }
  }
  return answer;
};

console.log(numIslands([
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"]
]));
