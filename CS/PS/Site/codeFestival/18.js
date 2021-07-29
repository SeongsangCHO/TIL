const score = ["70","82","95"];
let sum = 0;

sum = Math.floor(score.reduce((prev, next) => {
  return +prev + +next;
}) / score.length);
console.log(sum);

