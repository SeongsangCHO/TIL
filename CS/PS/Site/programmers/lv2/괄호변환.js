function isRight(arr) {
  if (arr.length === 0) {
    return false;
  }
  let stk = [];
  for (let value of arr) {
    if (value === "(") {
      stk.push("(");
    } else {
      if (stk.length === 0) {
        return false;
      }
      stk.pop();
    }
  }
  if (stk.length === 0) {
    return true;
  }
  return false;
}
let right = [];

function stepTwo(arr) {
  if(arr.length === 0){
    return "";
  }
  let map = {
    "(": 0,
    ")": 0,
  };
  let idx = 0;
  for (let value of arr) {
    if (value === ")") {
      map[value]++;
    } else {
      map[value]++;
    }
    idx++;
    if (map["("] === map[")"]) {
      break;
    }
  }
  let u = arr.slice(0, idx);
  let v = arr.slice(idx);
  if (!isRight(u)) {
    let result = "";
    result += "(";
    result += stepTwo(v);
    result += ")";
    let newU = reversal(u.slice(1, u.length - 1));

    return (result+newU);
  } else {
    return u.join('') + stepTwo(v);
  }
}
function reversal(arr) {
  let answer = [];
  for (let v of arr) {
    if (v === "(") {
      answer.push(")");
    } else {
      answer.push("(");
    }
  }

  return answer.join("");
}
function solution(p) {
  let arr = p.split("");
  if (isRight(arr) || p === "") {
    return p;
  }
  let a = stepTwo(arr);

  return a;
}

// console.log(solution("()))((()"));
console.log(solution(")))))))))))"))

//갯수만맞으면 균잡
//짝까지맞으면 올바른
