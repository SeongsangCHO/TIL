/*
지도 n x n, 공백, #(벽)으로 이루어짐
지도1, 2겹쳐서 전체 지도 얻음 => 둘 중 벽은 벽, 둘다 공백 => 공백
지도1,2 는 정수 배열로 암호화
0은 공백, 1은 벽 =>이를 십진수로 갖고 있음.
arr1, arr2를 2진수로 변환하고 AND연산해서 얻은 배열 1개가 전체배열,

*/
function makeBinaryArray(n, array) {
  return array.map((item) => {
    let binary = item.toString(2);
    if (binary.length < n) {
      let zeroCnt = n - binary.length;
      let zeroString = "";
      for (let i = 0; i < zeroCnt; i++) {
        zeroString += "0";
      }
      binary = zeroString + binary;
    }
    return binary;
  });
}
function solution(n, arr1, arr2) {
  var answer = [];
  arr1 = makeBinaryArray(n, arr1);
  arr2 = makeBinaryArray(n, arr2);
  let entireMap = new Array(n).fill('');
  console.log(arr1);
  console.log(arr2);

  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      if (arr1[i][k] === "1" || arr2[i][k] === "1") {
        entireMap[i] += "#";
      } else {
        entireMap[i]+= " ";
      }
    }
  }

  return entireMap;
}

console.log(solution(6, [46, 33, 33 ,22, 31, 50] ,[27 ,56, 19, 14, 14, 10]));
