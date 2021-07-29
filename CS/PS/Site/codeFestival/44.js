let number = "18234";

let sum = 0;
number.split('').map((value)=>{
  sum += +value;
});
console.log(sum);

let sum2 = 0;
let number2 = 18234;
while (number2){
  
  sum2 +=number2 % 10;
  number2 = Math.floor(number2 / 10);
}
console.log(sum2);
