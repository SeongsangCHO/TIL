from typing import List
import itertools
# n개중에 1, 2, n-1, n개뽑는 조합의 숫자같은뎀


class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        result = []

        def dfs(idx, path):
            result.append(path)
            for i in range(idx, len(nums)):
                dfs(i + 1, path + [nums[i]])
        dfs(0, [])
        return result
    print(subsets("", [1, 2, 3]))
