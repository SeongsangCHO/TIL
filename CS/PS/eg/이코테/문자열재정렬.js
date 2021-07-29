const input ="ZXYCXCX";

let result = "";
let sum = 0;

input.split('').map((value, idx) =>{
  if (value.charCodeAt(0) >= 65)
    result += value;
  else
    sum += +value;
});
result = result.split('').sort((a, b) => {
  return a.charCodeAt(0) > b.charCodeAt(0) ? 0 : -1;
}).join('');
if (sum != 0)
  result += sum;
console.log(result);
