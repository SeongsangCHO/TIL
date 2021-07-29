const scores = ["9 ", "1", "1", "5", "5", "5", "6", "4", "3", "4", "7", "9"];

let score = [];
let count = 0;
let sorted = scores.sort((a,b)=> a- b);
while (score.length < 3){
  let value = sorted.pop();
  if (!score.includes(value)){
    score.push(value);
  }
  count++;
}
console.log(score);
console.log(count);
