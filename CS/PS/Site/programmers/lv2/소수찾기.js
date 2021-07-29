const answer = [];

const isPrime = (number) => {
  if (number == 2) return true;
  if (number % 2 == 0 || number <= 1) return false;
  let last = Math.floor(Math.sqrt(number));
  for (let i = 2; i <= last; i++) {
    if (number % i == 0) return false;
  }
  console.log(number)
  return true;
};

const permutations = (arr, n, k) => {
  if (n === arr.length - 1) {
    const str = arr.slice(0, k).join("");
    if (!answer.includes(+str)) {
      answer.push(+str);
    }
    return;
  } else {
    for (let i = n; i < arr.length; i++) {
      let temp = arr[n];
      arr[n] = arr[i];
      arr[i] = temp;

      permutations(arr, n + 1, k);
      arr[i] = arr[n];
      arr[n] = temp;
    }
    return answer;
  }
};

function solution(numbers) {
  var result = 0;
  let permutation_arr = [];
  let arr = numbers.split("");
  for (let i = 1; i <= arr.length; i++) permutations(arr, 0, i);
  console.log(answer);
  for (let i = 0; i < answer.length; i++) {
    if (isPrime(answer[i])) {
      result++;
    }
  }
  return result;
}

console.log(solution("1234"));
