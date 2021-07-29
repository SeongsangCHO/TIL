function solution(participant, completion) {
  var answer = "";
  let participantMap = new Map();
  participant.forEach((name) => {
    if (!participantMap.has(name)) {
      participantMap.set(name, 1);
    } else{
      participantMap.set(name, participantMap.get(name) + 1);
    }
  });
  completion.forEach((name) =>{
      participantMap.set(name, participantMap.get(name) - 1);
  });
  
  participantMap.forEach((value, key) => {
    if(value === 1){
      answer = key;
    }
  })
  return answer;
}

console.log(solution(["leo", "leo", "kiki", "eden"], ["eden", "kiki", "leo"]));
//동명이인? => leo map leo => 1 , 2 complention 반복, map --,
//map 순회, 값이 0인 애 리턴
