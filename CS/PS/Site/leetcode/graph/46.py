from itertools import permutations
from typing import List 
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        per = permutations(nums)
        answer = []
        for v in list(per):
          answer.append(list(v))
        return answer
    print(permute("", [1,2,3]))