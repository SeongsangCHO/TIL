const arr = [1,3,5,4,8,6,7,2,0,9];


const mergeSort = (arr) => {
  if (arr.length <= 1) { return arr; };

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

const merge = (left, right) => {
  let result = [];
//while문은 숫자->boolean으로 변환
console.log(right);

  while (left.length && right.length){
    if (left[0] < right[0]){
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) { result.push(left.shift());}
  while (right.length) { result.push(right.shift());}
  return result;
}

console.log(mergeSort(arr));
