let arr = [0,1,2,3,4,5,6,7,8,9];


const binarySearch = (arr, target, start, end) => {
  while (start <= end){
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] === target)
      return mid;
    else if (arr[mid] > target){
      end = mid - 1;
    }
    else
      start = mid + 1;
  }
};
let result = binarySearch(arr, 5, 0, arr.length - 1);
console.log(result);
