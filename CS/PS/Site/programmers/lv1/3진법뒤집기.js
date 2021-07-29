function solution(n) {
  var answer = 0;
  console.log(n.toString(3).split("").reverse().forEach((number, index,arr)=>{
    let length = arr.length;
    answer += 3 ** (length -1 - index) * number;
  }));
  return answer;
}

console.log(solution(125));
