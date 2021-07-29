function solution(s) {
  var answer = '';
  answer = s.split("").sort((a, b)=> {
    return (a < b) - (a > b);
  }).join("");
  return answer;
}

console.log(solution("Zbcdefg"));
