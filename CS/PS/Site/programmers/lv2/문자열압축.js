function solution(s) {
  var answer = s.length;
  let len = s.length;
  let sliceUnitLen = Math.floor(len / 2);
  for (let i = 1; i <= sliceUnitLen; i++) {
    let tmpStr = "";
    let unit = s.substr(0, i);
    let cnt = 1;
    for (let j = i; j <= len; j += i) {
      let compareStr = s.substr(j, i);
      if (compareStr === unit) {
        cnt++;
      } else {
        if (cnt === 0 || cnt === 1) {
          cnt = "";
        }
        tmpStr += cnt + unit;
        unit = s.substr(j, i);
        cnt = 1;
        if (unit.length < i) {
          tmpStr += unit;
          break;
        }
      }
    }
    if (tmpStr.length < answer) {
      answer = tmpStr.length;
    }
  }

  return answer;
}

console.log(solution("aabbaccc"));
console.log(solution("ababcdcdababcdcd"));
