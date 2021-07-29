function solution(dartResult) {
  let sumArray = [];
  const len = dartResult.length;
  for (let i = 0; i < len; i++) {
    let v = dartResult[i];
    let sumLen = sumArray.length;
    if (v === "S") {
      sumArray[sumLen - 1] = sumArray[sumLen - 1] ** 1;
    } else if (v === "D") {
      sumArray[sumLen - 1] = sumArray[sumLen - 1] ** 2;
    } else if (v === "T") {
      sumArray[sumLen - 1] = sumArray[sumLen - 1] ** 3;
    } else if (v === "*") {
      sumArray[sumLen - 1] *= 2;
      if (sumLen >= 2) {
        sumArray[sumLen - 2] *= 2;
      }
    } else if (v === "#") {
      sumArray[sumLen - 1] *= -1;
    } else {
      if (v === "1" && dartResult[i + 1] === "0") {
        sumArray.push(10);
        i += 1;
        continue;
      }
      sumArray.push(parseInt(v));
    }
  }

  return sumArray.reduce((prev, curr) => prev + curr);
}
console.log(solution("1S2D*3T"));
console.log(solution("1D2S#10S"));
console.log(solution("1D2S0T"));
console.log(solution("1S*2T*3S"));
console.log(solution("1D#2S*3S"));
console.log(solution("1T2D3D#"));
console.log(solution("1D2S3T*"));

//점수|보너스|[옵션]으로 이루어짐
/*
옵션 : 스타(별), 아차(#)
스타 => 해당점수, 직전점수 2배
아차 => 해당 점수 -


스타 => 첫째도 가능 , 첫쩨 스타점수만 2배
스타 => 다른 스타와 중첩 => 중첩시 4배
스타 => 아차와 중첩 => 중첩된 아차 => -2배
SDT => 점수마다 1개씩 존재
스타,아차 => 점수마다 1개씩 존재 or 없을 수도.

1S2D*3T
1S => 1
2D => 2^2
스타 => 직전점수 2배, 2 + 해당점수 2배 => 2^2 * 2
3T = > 3^3 => 27

1*2 + 2^2*2 + 3^3 => 2+8+27 =>37

1S*2T*3S

1S* => 1 * 2
2T* => 2^3 * 2 , (1*2)*2
3S => 3^1

2 + 2 + 16 + 3 => 23 */
