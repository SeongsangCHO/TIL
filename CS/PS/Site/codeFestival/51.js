/*
merge Sort

리스트 길이가 0 또는 1이면 정렬된 것
그렇지 않으면
정렬되지 않은 리스트를 절반으로 잘라
비슷한 크기의 두 부분 리스트로 나눔
각 부분 리스트를 재귀적으로 합병 정렬을 이용해 정렬
두 부분 리스트를 다시 정렬된 하나의 리스트로 합병

*/
/*
나눌 수 없을 때 까지 최대한 쪼갠 후,
단계적으로 올라가면서 비교 후 정렬해서 다시 합침

해당 과정을 재귀적으로 반복함.
*/


// 분할 부분
const mergeSort = (arr) => {
  //이미 정렬 되어있다는 것을 체크
  if (arr.length <= 1) { return arr;}
  
  const mid = Math.floor(arr.length / 2);
  console.log(mid);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

// 정렬 후 합치는 부분
const merge = (left, right) => {
  let result = [];

  while (left.length && right.length){
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length){
    result.push(left.shift());
  }
  while (right.length){
    result.push(right.shift());
  }
  return result;
}

const arr = [1,3,5,4,8,6,7,2];

console.log(mergeSort(arr));