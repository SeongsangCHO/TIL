const solution = (time,currTime) =>{
  let answer = [];
  let current = currTime.split(':')
    .map(v =>parseInt(v,10));
  current = current[0] * 60 + current[1];
  
  for(let i of time){
    let tmp = i.split(":").map(v=>parseInt(v, 10));
    tmp = tmp[0] * 60 + tmp[1];
    console.log(tmp);
    if (tmp < current){
      answer.push('지나갔습니다');
    } else {
      tmp -= current;
      let minute = tmp % 60;
      let hour = Math.floor(tmp / 60);
      answer.push(String(hour).padStart(2, '0')+'시간 '
      +String(minute).padStart(2, '0')+'분');
    }
  }
  return answer;
}

console.log(solution(["12:30","13:20","14:13"], "12:40"));