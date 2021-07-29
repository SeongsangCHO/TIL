function solution(n, a, b) {
  var answer = 1;
  let player = new Array(n).fill(0).map((_, idx) => idx + 1);
  let playerLength = player.length;
  let winnerArray = [];
  while (playerLength != 2) {
    winnerArray = [];
    for (let i = 0; i < playerLength; i += 2) {
      let sliced = [player[i], player[i + 1]];
      if (sliced.includes(a) && sliced.includes(b)) {
        return answer;
      } else if (sliced.includes(a)) {
        winnerArray.push(a);
      } else if (sliced.includes(b)) {
        winnerArray.push(b);
      } else {
        winnerArray.push(player[i]);
      }
    }
    playerLength = player.length;
    player = [...winnerArray];
    answer++;
  }

  return answer;
}

console.log(solution(8, 4, 7));
console.log(solution(4, 1, 2)); // 1
console.log(solution(2, 1, 2)); // 1
