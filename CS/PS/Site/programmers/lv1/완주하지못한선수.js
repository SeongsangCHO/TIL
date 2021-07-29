function solution(participant, completion) {
  var answer = "";
  let candidate = new Map();
  //parti 반복해서 돌리고 없으면 키추가, +1
  //있으면 값 +1,
  //comple반복해서 해당 키값 -1씩해서
  //filter로 0인사람 리턴
  for (let i of participant) {
    if (!candidate.has(i)) {
      candidate.set(i, 1);
    } else {
      candidate.set(i, candidate.get(i) + 1);
    }
  }
  for (let i of completion){
    if (candidate.has(i)){
      candidate.set(i, candidate.get(i) - 1);
    }
  }
  let a = Array.from(candidate).filter((v) => v[1] == 1)[0][0];
  return a;
}

let participant = ["leo", "kiki", "eden"];
let completion = ["eden", "kiki"];

console.log(solution(participant, completion));
