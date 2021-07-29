/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
  let stack = [];
  let result = Array(T.length).fill(0);
  for(let index in T){
    while(stack.length > 0 && 
      T[index] > T[stack[stack.length - 1]]){
        result[stack[stack.length - 1]] = (index - stack.pop());
      }
    stack.push(index);
  }
  console.log(result);
  return result;
};
