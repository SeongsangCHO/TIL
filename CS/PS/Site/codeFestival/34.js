const input = "176 156 155 165 166 169";
let sorted = "";

// -값 오름차 , + 오름차
console.log(input.split(' ').sort((a,b)=> a - b).join(" "));