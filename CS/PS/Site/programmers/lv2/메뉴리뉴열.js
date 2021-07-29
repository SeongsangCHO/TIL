function getCombi(arr, sn) {
  const result = [];
  if (sn === 1) {
    return arr.map((v) => [v]);
  }
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combis = getCombi(rest, sn - 1);
    const att = combis.map((combi) => [fixed, ...combi]);
    result.push(...att);
  });
  return result;
}

function solution(orders, course) {
  let candidate = [];
  let map = new Map();
  for(let i = 0; i < orders.length; i++){
    let splited = orders[i].split('').sort();
    for(let co of course){
      candidate = getCombi(splited, co);
      for(let set of candidate){
        if(!map.has(set.join(''))){
          map.set(set.join(''), 1);
        } else{
          map.set(set.join(''), map.get(set.join('')) + 1);
        }
      }
    }
  }
  
  let filtered = [...map].filter((v) => v[1] > 1);
  let max = new Map();
  
  for(let i = 0; i < filtered.length; i++){
    if(!max.has(filtered[i][0].length)){
      max.set(filtered[i][0].length, filtered[i][1]);
    }
    if(max.get(filtered[i][0].length) < filtered[i][1]){
      max.set(filtered[i][0].length, filtered[i][1]);
    }
  }
  let answer = [];
  console.log(max);
  
  for(let v of filtered){
    if(v[1] === max.get(v[0].length)){
      answer.push(v[0]);
    }
  }
  return answer.sort()
}

console.log(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"],[2,3,4]));
// console.log(solution(["XYZ", "XWY", "WXA"],[2,3,4]));
