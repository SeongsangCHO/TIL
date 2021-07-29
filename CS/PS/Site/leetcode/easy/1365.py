from typing import List

class Solution:
    def smallerNumbersThanCurrent(self, nums: List[int]) -> List[int]:
      length = len(nums)
      result = [0] * length
      for i in range(length):
        for j in range(length):
          if j == i:
            continue
          if nums[i] > nums[j]:
            result[i] = result[i] + 1
      return result
    smallerNumbersThanCurrent("", [8,1,2,2,3])
