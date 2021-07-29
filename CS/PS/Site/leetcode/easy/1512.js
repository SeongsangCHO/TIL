/**
 * @param {number[]} nums
 * @return {number}
 2중반복문돌면서 (내원소 제외)
 나랑 같은거있으면 +1
 */
var numIdenticalPairs = function (nums) {
  let map = {};
  let count = 0;
  nums.forEach((num) => { 
    if (map[num]) {
      count += map[num];
      map[num]++;
    }
    else
      map[num] = 1;
  })
  
  console.log(count);
  
  return count;
};

numIdenticalPairs([1, 2, 3, 1, 1, 3]);
numIdenticalPairs([1,1,1,1]);
numIdenticalPairs([1, 2, 3]);

