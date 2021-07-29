const vote = "대리 대리 대리 태리 태리 태리 태리 제홍 제홍 미혜 미혜";

let president = "";
let candidate = {};
vote.split(' ').map((value) => {
  candidate[value] = candidate[value] === undefined ? 1 : candidate[value] + 1;
});

president = Object.keys(candidate).reduce((prev, next) => {
  return candidate[prev] > candidate[next] ? prev : next;
  //prev, next랑 대소비교하면서
  // true면 현재, prev가 다음 prev값으로 들어가게됨
  // 큰 값이 prev, 다음 값이 next
  // 계속해서 큰 값이 prev로 쌓임
  // 중첩된 prev가 반환이 되는 것 => taelee
});
console.log(president, candidate[president]);
console.log(candidate);
