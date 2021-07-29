function solution(strings, n) {
  var answer = [];
  strings.sort((a,b) =>{
    if (a[n] === b[n])
        return -1;
    return a[n].charCodeAt(0) > b[n].charCodeAt(0) ? 1 : -1; 
  });
  return strings;
}

console.log(solution(["sun","bed","car"], 0));
