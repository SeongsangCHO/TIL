function solution(board, moves) {
  var answer = 0;
  let basket = [];

  moves = moves.map((move) => move - 1);
  let boardLength = board[0].length;
  let movesLength = moves.length;

  for (let i = 0; i < movesLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      //moves에 세로 한줄씩 읽기
      if (board[j][moves[i]] === 0) {
        continue;
      } else {
        //0이 아닐 때
        if (
          basket.length !== 0 &&
          basket[basket.length - 1] === board[j][moves[i]]
        ) {
          //바구니의 최상단과 같다면,
          basket.pop();
          answer += 2;
        } else {
          basket.push(board[j][moves[i]]);
        }
        board[j][moves[i]] = 0;
        break;
      }
    }
  }

  return answer;
}

console.log(
  solution(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4]
  )
);
