let string = "[][][][[]][]{}({})";

let input = string.split('');

function solution(input) {
  let splited = [];
  
  for (let i = 0; i < input.length; i++) {
    if (input[i] == '[' ||
        input[i] == '{' ||
        input[i] == '(') {
      splited.push(input[i]);
    } else {
      let popValue = splited.pop();
      if ((popValue == '[' && input[i] != ']') ||
          (popValue == '{' && input[i] != '}') ||
          (popValue == '(' && input[i] != ')')
          ) return "NO" ;
    }
  }
  return "YES";
}
console.log(solution(input));
