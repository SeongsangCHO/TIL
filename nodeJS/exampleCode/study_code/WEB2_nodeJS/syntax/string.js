
var name = 'secho';

var letter = `Dear ${name} 

lorem ipsum`;

var nums = [2,7,11,15];
var target = 9;

const twoSum = (nums, target) => {
    const map = {};
  
    for (let i = 0; i < nums.length; i++) {
      const another = target - nums[i];
        console.log("target "+target+" nums["+i+"] "+nums[i]+" another "+another);
      if (another in map) {
        return [map[another], i];
      }
  //2:0
  //7:1
      map[nums[i]] = i;
    }
  
    return null;
  };


  console.log(twoSum(nums, target));
  