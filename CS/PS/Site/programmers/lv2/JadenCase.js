const isAlphabet = (char) => {
  let ascii = '';
  if (char){
    ascii = char.charCodeAt(0);
  }
  if (ascii < 97 || ascii > 122) {
    return false;
  }
  return true;
};

function solution(s) {
  var answer = "";
  let tokens = s
    .split(" ")
    .map((v) => {
      v = v.toLowerCase();
      if (isAlphabet(v[0])) {
        let upperCase = String.fromCharCode(v[0].charCodeAt(0) - 32);
        let leftString = "";
        if (v.length >= 2) {
          leftString = v.split("").slice(1).join("");
        }
        return upperCase + leftString;
      } else {
        return v;
      }
    })
    .join(" ");
  return tokens;
}

console.log(solution(" a"));
