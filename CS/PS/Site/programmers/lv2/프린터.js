function solution(priorities, location) {
  var answer = 1;
  let queue = priorities;
  priorities = priorities.map((item, idx) => {
    return [idx, item];
  });
  
  while (queue.length> 0) {
    let max = Math.max.apply(null, queue);
    for (let i = 1; i <= priorities.length; i++) {
      console.log(i);
      
      if(priorities[0][1] < max){
        let tmp = priorities[0];
        priorities = priorities.slice(1);
        priorities.push(tmp);
        let qTmp = queue.shift();
        queue.push(qTmp);
        continue;
      }
      else if(priorities[0][1] === max){
        if(priorities[0][0] === location){
          return answer;
        }
        priorities = priorities.slice(1);
        queue.shift();
        answer++;
        break;
      }
    }
  }
  return answer;
}

console.log(solution([1,1,9,1,1,1], 1));
