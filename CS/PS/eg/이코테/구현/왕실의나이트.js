function solution(pos) {
  let row = parseInt(pos[1]);
  let col = pos[0].charCodeAt(0) - 96;

  let move = [
    [-1, -2],
    [-2, -1],
    [1, -2],
    [2, -1],
    [-1, 2],
    [-2, 1],
    [1, 2],
    [2, 1],
  ];
  let answer = 0;
  for (let i = 0; i < 8; i++) {
    if (
      row + move[i][0] >= 1 &&
      row + move[i][0] <= 8 &&
      col + move[i][1] >= 1 &&
      col + move[i][1] <= 8
    ) {
      answer++;
    }
  }
  return answer;
}

console.log(solution("d1"));
