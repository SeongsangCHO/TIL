const input = ["A", "B", "C","D"];
const answer = [];

const solution = (arr, n, k) => {
  if (n === arr.length - 1) {
    const str = arr.slice(0, k).join("");
    if (!answer.includes(str)) {
      answer.push(str);
    }
    return;
  } else {
    for (let i = n; i < arr.length; i++) {
      let temp = arr[n];
      arr[n] = arr[i];
      arr[i] = temp;

      solution(arr, n + 1, k);
      arr[i] = arr[n];
      arr[n] = temp;
    }
    return answer;
  }
};

console.log(solution(input, 0, 4));
