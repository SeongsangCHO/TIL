let arr = [2, 3, 1, 2, 2];


arr.sort();

let count = 0;
let people = 0;
for(let i of arr){
  people += 1;
  if (i <= people){
    people = 0;
    count++;
  }
}
console.log(count);
