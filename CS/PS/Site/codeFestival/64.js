let N = 4;

let answer = 0;
while (N >= 0) {
  if (N % 7 == 0) {
    N = Math.floor(N / 7);
    answer += N;
    break;
  }
  N -= 3;
  answer++;
  if (N < 0) {
    console.log(-1);
    break;
  }
}
console.log(answer);
