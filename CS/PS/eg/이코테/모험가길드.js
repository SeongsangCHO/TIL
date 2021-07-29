arr = [3, 4, 5, 6, 7, 8, 1, 2, 3, 4];

//오름차 순 정렬
let sorted = arr.sort();
console.log(sorted);

let groupSize = 0;
let count = 0;

for (i of sorted) {
  count += 1;
  if (i <= count) {
    groupSize += 1;
    count = 0;
  }
}

console.log(groupSize);
