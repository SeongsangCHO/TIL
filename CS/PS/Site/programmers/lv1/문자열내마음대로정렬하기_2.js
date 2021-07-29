function solution(strings, n) {
  var answer = [];
  answer = strings.sort((a, b) => {
    if (a[n] === b[n]) {
      //a문자열이 b보다 사전순으로 뒤에있으면 b를 앞으로.
      return (a > b) - (a < b);
    } else{
      //1일 때 b(뒤에있는걸 앞으로 정렬)
      //a[n]이 b보다 뒤에있으면 b를 앞으로.
      return (a[n] > b[n]) - (a[n] < b[n]);
    }
  });
  return answer;
}

console.log(solution(["sun", "bed", "car"], 1));
console.log(solution(["abce", "abcd", "cdx"], 2));
