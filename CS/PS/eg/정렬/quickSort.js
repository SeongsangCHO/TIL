let arr = [1,3,5,4,8,6,7,2,9,10];

const quickSort = (arr,start,end) => {
 if(start >= end) { return ; }

 let pivot = start;
 let left = start + 1;
 let right = end;

 while (left <= right){
   while (left <= end && arr[left] <= arr[pivot]) {left++;}
   while (start < right && arr[right] >= arr[pivot]) {right--;}
   if (left > right){
     let tmp = arr[pivot];
     arr[pivot] = arr[right];
     arr[right] = tmp
   } else{
     let tmp = arr[left];
     arr[left] = arr[right];
     arr[right] = tmp;
   }
  }
  quickSort(arr, start, right -1);
  quickSort(arr, right + 1, end);
}

console.log(quickSort(arr, 0, arr.length -1));

console.log(arr);
