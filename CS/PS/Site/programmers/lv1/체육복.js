function solution(n, lost, reserve) {
  var answer = 0;
  let student = new Array(n + 1).fill(1);
  student[0] = 0;
  
  for(let lostNumber of lost){
    student[lostNumber]--;
  }
  for(let reserveNumber of reserve){
    student[reserveNumber]++;
  }
  for(let i = 1; i <= n; i++){
    for(let lostNumber of lost){
      if (student[lostNumber] == 0){
        if (student[lostNumber - 1] == 2){
          student[lostNumber - 1]--;
          student[lostNumber]++;
          break;
        }
        if (student[lostNumber + 1] == 2){
          student[lostNumber + 1]--;
          student[lostNumber]++;
          break;
        }
      }
    }
  }
  return student.filter((v) => v >=1).length;
}

console.log(solution(4, [2,4],[3]));
