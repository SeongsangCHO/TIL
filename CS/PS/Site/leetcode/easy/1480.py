from typing import List
class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
      for v in range(1, len(nums)):
        nums[v] = nums[v] + nums[v - 1]
      return nums
    runningSum(1,[0,1,2,3,4,5,6,7,8,9]);