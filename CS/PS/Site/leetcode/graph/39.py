from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        result = []

        def dfs(tmp, csum):
            if csum < 0:
                return
            if csum == 0:
                result.append(tmp[:])
                return
            for v in candidates:
                tmp.append(v)
                dfs(tmp, csum - v)
                tmp.pop()
        dfs([], target)
        
        result_set = []
        for lst in result:
            lst.sort()
            if lst not in result_set:
                result_set.append(lst)
        return result_set
    print(combinationSum("", [2, 3, 6, 7], 7))
    print(combinationSum("", [2, 3, 5], 8))
