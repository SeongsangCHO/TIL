function solution(a, b) {
  var answer = '';
  const month = [31,29,31,30,31,30,31,31,30,31,30,31];
  const day = ["FRI","SAT","SUN","MON","TUE","WED","THU"];
  let days = 0;
  for (let mon = 0; mon < a; mon++){
    days += month[mon];
  }
  
  
  return day[(days - (month[a - 1] - b) - 1) % 7];
}

console.log(solution(1,11));