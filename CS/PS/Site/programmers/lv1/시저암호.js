function solution(s, n) {
  var answer = [];
  const sLength = s.length;
  // String.fromCharCode(65);
  //65 ~ 90 // 91 나머지 => 65이하면 + 65
  //97 ~ 122 // 123 나머지 => 97 이하면 + 97
  for (let i = 0; i < s.length; i++) {
    const codeAt = s.charCodeAt(i);
    if (codeAt >= 65 && codeAt <= 90) {
      let code = (n + codeAt) % 91;
      if ((code) <= 65){
        code += 65
      }
      answer.push(String.fromCharCode(code));
    }
    else if (codeAt >= 97 && codeAt <= 122) {
      let code = (n + codeAt) % 123;
      
      if ((code) <= 97){
        code += 97
      }
      answer.push(String.fromCharCode(code));
    } else{
      answer.push(s[i]);
    }
  }
  return answer.join("");
}

console.log(solution("a z", 1));
