let a = [1,2,3,4];
let b = ['a','b','c','d'];

let result = [];
// let index = 0;
// while(a.length && b.length){
//   result.push([a.shift(),b.shift()]);
//   while(a.length && !b.length) {result.push([a.shift()]);}
//   while(b.length && !a.length) {result.push([b.shift()]);}
// }

// let c = a.map((value, idx) => [value, b[idx]])
// console.log(c);

let c = a.map((value , idx) => {
  if (idx % 2 != 0){
    return [b[idx],value]
  }
  return [value, b[idx]];
})

console.log(c);
