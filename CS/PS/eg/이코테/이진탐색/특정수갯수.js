let arr = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3];

const solve = (arr, findNumber) => {
  let start = 0;
  let end = arr.length - 1;
  let mid;
  let cnt = 0;
  let isFinded = false;
  while (start <= end){
    mid = Math.floor((start + end) / 2);
    if (arr[mid] == findNumber){
      isFinded = true;
      break;
    }
    else if (arr[mid] > findNumber){
      end = mid - 1;
    }
    else
      start = mid + 1;
  }
  if (!isFinded)
    return -1;
  else{
    //mid지점에서 뒤로가면서 갯수 세기
    for(let i = mid; i >= 0; i--){
      if (arr[i] == findNumber)
        cnt++;
      else
        break;
    }
    for (let j = mid + 1; j < arr.length; j++){
      if (arr[j] == findNumber)
        cnt++;
      else
        break;
    }
  }
  return cnt;
}

console.log(solve(arr, 2));
