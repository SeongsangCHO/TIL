from itertools import combinations
from typing import List

class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
      comb = list(combinations(nums, 3))
      answer = []
      print(comb)
    threeSum("",[-1,0,1,2,-1,-4])

        