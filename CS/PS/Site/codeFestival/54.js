let arr = [1,4,2,3,5];

const solution = (arr) => {
  let length = arr.length;
  arr.sort((a,b) => a - b);
  let answer = 0;
  for (let i = 1; i < arr.length; i++){
    if ((arr[i - 1] + 1) !== arr[i])
      return "NO";
    /*
    if (arr[i] == arr[i - 1])
      return "NO"
    answer += arr[i] - arr[i - 1];
  */
  }
  return "YES"
  // return answer == length - 1 ? "YES" : "NO";
  
}
console.log(solution(arr));