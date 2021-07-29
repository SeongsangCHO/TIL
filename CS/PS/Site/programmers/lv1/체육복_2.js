function solution(n, lost, reserve) {
  var answer = 0;

  let uniforms = new Array(n).fill(1);
  for (let index of lost) {
    uniforms[index - 1]--;
  }
  for (let index of reserve) {
    uniforms[index - 1] += 1;
  }
  for (let [index, uniform] of uniforms.entries()) {
    if (uniform === 0) {
      
      if (index != 0 && uniforms[index - 1] === 2) {
        uniforms[index] += 1;
        uniforms[index - 1] -= 1;
        continue;
      }
      if (index < uniforms.length && uniforms[index + 1] === 2) {
        uniforms[index] += 1;
        uniforms[index + 1] -= 1;
        continue;
      }
    }
  }
  
  uniforms.forEach((value) => {
    if(value >= 1){
      answer +=1;
    }
  })

  return answer;
}
console.log(solution(2,[1],[2]));
