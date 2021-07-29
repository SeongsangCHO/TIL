let arr = [1,3,5,4,8,6,7,2,9,10];

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  
  return merge(mergeSort(left), mergeSort(right));
}

const merge = (left, right) => {
  let result = [];

  while (left.length && right.length){
    if (left[0] < right[0]){
      result.push(left.shift());
    } else{
      result.push(right.shift());
    }
  }
  while (left.length){ result.push(left.shift())}
  while (right.length){ result.push(right.shift())}
  return result;
}


console.log(mergeSort(arr));


const quickSort = (arr, start, end) => {
  if (start >= end) return ;

  let pivot = start;
  let left = start + 1;
  let right = end;

  while (left <= right) {
    while(left <= end && arr[left] >= arr[pivot]) {left++;}
    while(right > start && arr[right] <= arr[pivot]) {right--;}
    if (left > right){
      let tmp = arr[pivot];
      arr[pivot] = arr[right];
      arr[right] = tmp;
    } else{
      let tmp = arr[right];
      arr[right] = arr[left];
      arr[left] = tmp;
    }
  }
  quickSort(arr, start, right - 1);
  quickSort(arr, right + 1, end);
}

quickSort(arr, 0, arr.length - 1);
console.log(arr);

