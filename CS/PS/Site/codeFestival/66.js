let top = ["BACDE", "CBADF", "AECB", "BDA"];

const RULE = "CBD";

const solution = (top, RULE) => {
  let answer = [];
  for (let i of top){
    answer.push(check(i, RULE));
  }
  return answer;
}

const check = (part, RULE) => {
  let store = RULE.indexOf(RULE[0]);
  for(let i of part){
    if (RULE.includes(i)){      
      if (store > RULE.indexOf(i)){
        return '불가능'
      } else{
        store = RULE.indexOf(i);
      }
    }
  }
  return '가능'
}

console.log(solution(top, RULE))