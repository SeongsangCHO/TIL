from typing import List


class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        visited = [False] * len(nums)
        result = []
        tmp = []

        def dfs():
            if len(nums) == len(tmp):
                result.append(tmp[:])
                return
            for v in range(len(nums)):
                if visited[v] == True:
                    continue
                visited[v] = True
                tmp.append(nums[v])
                dfs()
                tmp.pop()
                visited[v] = False
        dfs()
        return result
    print(permute("", [1, 2, 3]))
    print(permute("", [0, 1]))
