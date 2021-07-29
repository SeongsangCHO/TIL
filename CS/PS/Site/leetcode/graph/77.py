from typing import List 

class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        result = []
        nums = [v for v in range(1, n + 1)]
        def dfs(element, start, k):
          if k == 0:
            result.append(element[:])
            return
          for idx in range(start, n):
            element.append(nums[idx])
            dfs(element, idx + 1, k - 1)
            element.pop()
        dfs([], 0, k)
        return result
    print(combine("", 4, 2))
    