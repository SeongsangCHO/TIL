/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const dfs = (x, y, grid) => {
    if (
      x < grid.length &&
      x >= 0 &&
      y < grid[0].length &&
      y >= 0 &&
      grid[x][y] === "1"
    ) {
      grid[x][y] = "0";
    } else {
      return;
    }
    dfs(x - 1, y, grid);
    dfs(x + 1, y, grid);
    dfs(x, y - 1, grid);
    dfs(x, y + 1, grid);
  };
  let answer = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        dfs(i, j, grid);
        answer++;
      }
    }
  }
  return answer;
};

console.log(
  numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ])
);
console.log(
  numIslands([
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ])
);
