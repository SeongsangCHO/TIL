from typing import List
class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
      result = 0
      length = len(nums)

      for i in range(length - 1):
        for j in range(i + 1, length):
          if nums[i] == nums[j]:
            result = result + 1
      return result
    numIdenticalPairs("", [1,2,3,1,1,3])
