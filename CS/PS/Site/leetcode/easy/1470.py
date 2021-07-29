from typing import List
class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
      result = []
      for v in range(int(len(nums) / 2)):
        result.append(nums[v])
        result.append(nums[v +int(len(nums) / 2)])
      return result
    print(shuffle(1, [2,5,1,3,4,7], 3))