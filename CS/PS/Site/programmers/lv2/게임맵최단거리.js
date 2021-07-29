function solution(maps) {
  var answer = -1;
  //0, 2는 이동 못함.
  // 0,0 to 4,4으로 도착할 수 있는 비용중 최단 비용
  // base condi는 4,4일때 또는 이동지점이 0또는 2일 때
  // 4,4일 때 비용 push.
  // 도달하지 못한 경우는 비용이 들어가지 않으므로 candidate length가 없을 것임 그 때 -1리턴
  // 방문여부는 전역으로 하면 안됨.
  let costs = 0;
  let n = maps.length;
  let m = maps[0].length;

  let posX = [-1, 1, 0, 0];
  let posY = [0, 0, -1, 1];
  let queue = [[0, 0, 0]];
  while (queue.length > 0) {
    let [row, col, cost] = queue.shift();
    maps[row][col] = 2;
    if (row === n - 1 && col === m - 1) {
      return cost + 1;
    }
    for (let i = 0; i < 4; i++) {
      let movX = row + posX[i];
      let movY = col + posY[i];
      if (
        movX >= 0 &&
        movX <= n - 1 &&
        movY >= 0 &&
        movY <= m - 1 &&
        maps[movX][movY] === 1
      ) {
        queue.push([movX, movY, cost + 1]);
      }
    }
  }
  return answer;
}

console.log(
  solution([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1]
  ])
);
console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1]
  ])
);
