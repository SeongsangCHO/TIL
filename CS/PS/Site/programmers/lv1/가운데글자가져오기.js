function solution(s) {
  var answer = "";

  console.log();
  return answer = s.length % 2 == 0
    ? s[(Math.floor(s.length / 2)) - 1] +s[Math.floor(s.length / 2)]
    : s[Math.floor(s.length / 2)];
}

console.log(solution("a"));
