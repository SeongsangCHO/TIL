let A = [1, 2, 5, 4, 3];
let B = [5, 5, 6, 6, 5];

const solve = (A, B, K) => {
  let answer = 0;
  A.sort();
  B.sort((a,b) => b - a);
  // for(let i = K; i < A.length; i++){
  //   answer += A[i];
  // }
  // for(let j = 0; j < K; j++)
  //   answer += B[j];
  // console.log(answer);
  for (let i = 0; i < K; i++){
    if (A[i] < B[i]){
      let tmp = A[i];
      A[i] = B[i];
      B[i] = tmp;
    }
    else
      break;
  }
  answer = A.reduce((prev, curr) => prev + curr);
  console.log(answer);  
  
};

solve(A, B, 3);
