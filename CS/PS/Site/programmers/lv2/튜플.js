function solution(s) {
  var answer = [];
  let parse = "";
  let len = s.length;
  for (let i = 0; i < len; i++) {
    if (s[i] === "{") {
      parse += "[";
    } else if (s[i] === "}") {
      parse += "]";
    } else parse += s[i];
  }

  let parseArr = JSON.parse(parse);
  let sorted = parseArr.sort((a, b) => {
    return a.length - b.length;
  });
  let set = new Set();
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < sorted[i].length; j++) {
      set.add(sorted[i][j]);
    }
  }

  return [...set];
}

console.log(solution("{{2},{2,1},{2,1,3},{2,1,3,4}}"));
console.log(solution("{{1,2,3},{2,1},{1,2,4,3},{2}}"));
console.log(solution("{{123}}"));
console.log(solution("{{20,111},{111}}"));
console.log(solution("{{4,2,3},{3},{2,3,4,1},{2,3}}"));

