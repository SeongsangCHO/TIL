let a = [
  [1, 2],
  [2, 4],
];
let b = [
  [1, 0],
  [0, 3],
];

// c = a[i][k] * b[k][j]

const solution = (a,b) => {
  let row = [];
  let answer = [];
  //결과물의 크기는 m * n n * m에서 m * m으로.
  a.forEach((v => answer.push(Array(b[0].length).fill(0))))
  //a의 열과 b의 행 길이가 같아야 곱셈가능
  const len = b.length;
  if (len == a[0].length){
    //a의 행만큼 반복할 것
    for (let i = 0; i < len; i++){
      //a행하나당 b의 열만큼 곱해야함
      for(let j = 0; j < len; j++){
        let x = 0;
        //b의 행수만큼
        for(let k = 0; k < len; k++){
          answer[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return answer;
  } else{
    return -1;
  }
}

console.log(solution(a,b));
