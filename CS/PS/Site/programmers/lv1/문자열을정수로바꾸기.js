function solution(s) {
  return s[0] == '-' ? -s.slice(1) : +s;
}

console.log(solution("-1234"));
