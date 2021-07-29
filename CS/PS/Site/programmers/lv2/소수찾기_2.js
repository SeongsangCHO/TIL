const getPermutaition = (arr, selectedNumber) =>{
  const result = [];
  if(selectedNumber == 1){
      return arr.map((item) => [item]);
  }
  arr.forEach((fixed, index, origin)=>{
      const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
      const combis = getPermutaition(rest, selectedNumber - 1);
      const attachment = combis.map((combi) => [fixed, ...combi]);
      result.push(...attachment);
  });
  return result;
}

const isPrime = (number) =>{
  if (number < 2)
    return false;
  let half = Math.floor(number / 2);
  for(let i = 2; i <= half; i++){
    if(number % i === 0){
      return false;
    }
  }
  return true;
}

function solution(numbers) {
  var answer = 0;
  let arr = numbers.split("");
  let candidate = [];
  let set = new Set();
  for(let i = 1; i <= arr.length; i++){

    candidate = [...getPermutaition(arr,i)];
    for(let v of candidate){
      set.add(parseInt(v.join('')));
    }
  }
  set.forEach((v) => {
    if(isPrime(v)){
      answer++;
    }
  })
  return answer;
}

console.log(solution("17"));
console.log(solution("011"));
