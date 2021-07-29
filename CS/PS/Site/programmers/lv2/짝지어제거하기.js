function solution(s) {
  var answer = 0;
  let len = s.length;
  let stk = [];
  for (let i = 0; i < len; i++) {
    let top = stk.length - 1;
    if (stk[top] === s[i]) {
      stk.pop();
    } else {
      stk.push(s[i]);
    }
  }
  return stk.length >= 1 ? 0 : 1;
}

console.log(solution("baabaa"));
