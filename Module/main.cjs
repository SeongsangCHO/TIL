const sum = require("./util.cjs");
const { print } = require("./util.cjs");

print("hello"); //hello

const answer = sum(1, 2);
console.log(answer); // 3

sum.print("WHAT"); // WHAT

console.log(sum); // [Function (anonymous)] { print: [Function (anonymous)] }

