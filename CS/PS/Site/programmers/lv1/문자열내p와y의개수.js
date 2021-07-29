//p,y갯수가 같으면 true, 다르면 false, 하나도 없으면 true
//대소문자 비교 X

function solution(s){
  var answer = true;
  let obj = {
    p : 0,
    y : 0,
  }
  s.split("").forEach((letter) => {
    if((letter === "p" || letter === "P")
    ||(letter === "y" || letter==="Y")
    ){
      letter = letter.toLowerCase()
      obj[letter] += 1;
    }
  });
  if (obj.p === obj.y) {
    return true;
  } else {
    return false;
  }
  return answer;
}

console.log(solution("pPoooyY"));
