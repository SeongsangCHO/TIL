function solution(s) {
  if(s.length != 4 && s.length != 6){
    return false;
  }
  var answer = true;
  let array = s.split("");
  for(let letter of array){
    if(!(letter >='0' && letter<='9')){
      return false;
    }
  }
  return answer;
}

console.log(solution("1"));
