function solution(people, limit) {
  var answer = 0;
  let left = 0;
  people = people.sort((a, b) => b - a);
  console.log(people, limit);

  let len = people.length;
  let right = len - 1;
  for (let i = 0; i < len; i++) {
    if (people[left] + people[right] !== 0) {
      if (people[left] + people[right] <= limit) {
        answer++;
        people[left] = 0;
        people[right] = 0;
        left++;
        right--;
      } else {
        left++;
        answer++;
      }
      if (left === right) {
        answer++;
        break;
      }
    }
  }
  return answer;
}

console.log(solution([70, 80, 50], 100)); // 3
console.log(solution([50], 100)); // 1
console.log(solution([90, 20, 10], 100)); // 2
console.log(solution([49, 51, 50, 50], 100)); // 2
console.log(solution([50, 50], 100)); // 1
console.log(solution([98, 3], 100)); // 2
console.log(solution([40, 40, 40, 120], 120)); // 2c
console.log(solution([10, 10, 10, 20, 20, 20], 20)); // 5
console.log(solution([50, 70, 80, 50], 100)); // 3
