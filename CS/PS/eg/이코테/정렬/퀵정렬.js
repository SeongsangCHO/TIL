let arr = [1,3,5,4,8,6,7,2,9,10];
const quickSort = (array, start, end) => {
  
  if (start >= end) return;
  let left = start + 1;
  let right = end;
  let pivot = start;

  while (left <= right) {
    while (left <= end && array[left] <= array[pivot]) left++;
    while (right > start && array[right] >= array[pivot]) right--;
    if (left > right) {
      let tmp = array[right];
      array[right] = array[pivot];
      array[pivot] = tmp;
    } else {
      let tmp = array[right];
      array[right] = array[left];
      array[left] = tmp;
    }
  }
  //분할되었을 때 right까지가 피봇값이니까 그 왼쪽은
  //피봇보다 작은 값들이 존재 재귀적으로 수행.1개까지 나뉘었을때
  //한번 더 호출하면 end가 -이므로 return.
  quickSort(array, start, right - 1);
  quickSort(array, right + 1, end);
  
};
quickSort(arr, 0, arr.length - 1);
console.log(arr);
