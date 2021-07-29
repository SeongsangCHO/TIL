/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */

 /*애들중 여분캔디를 포함해서 가장많은 캔디수를 가질 수 있는지
 candies중 max값을 뽑고
 각 원소에 더해서 max값이 되는지 확인이 되면 true,
 안되면 false. boolean배열 반환

var myArray = [-3, -2, 1, 3, 5];
var max = Math.max.apply(null, myArray);
apply를 사용하면 숫자로 이루어진 배열을 파라미터로 전달할 수 있음.

//최대값
var max = array.reduce( function (previous, current) { 
	return previous > current ? previous:current;
});

//최소값
var min = array.reduce( function (previous, current) { 
	return previous > current ? current:previous;
});

var min = [1, 20, 11, 88, 3].slice(0).sort(function(a,b){a>b})[0];
var max = [1, 20, 11, 88, 3].slice(0).sort(function(a,b){a<b})[0];

 */
var kidsWithCandies = function (candies, extraCandies) {
  let answer = [];

  let max = candies.slice(0).sort((a, b) => b - a)[0];
  
  candies.forEach((value, index) => {
    if (value + extraCandies >= max)
      answer.push(true);
    else
      answer.push(false);
  });
    
  return answer;
};
kidsWithCandies([2, 3, 5, 1, 3], 3);