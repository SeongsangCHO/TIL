
let count = 0;
for (let i = 0 ; i < 1000; i++){
  let tmp = i;
  while (tmp != 0){
    if (tmp % 10 == 1)
      count++;
    tmp = Math.floor(tmp / 10)
  }
}
console.log(count);


let s = '';

for (let i = 0; i <= 19; i++){
  s += i;
}
let cnt = 0;
for (let i of s){
  if (i == 1){cnt++;}
}
console.log(cnt);

console.log(s.match(/1/g).length);
