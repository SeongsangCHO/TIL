from typing import List


class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        lst = [v for v in range(1, n + 1)]
        result = []
        tmp = []
        print(lst)
        def dfs(tmp, start):
          if len(tmp) == k:
            result.append(tmp[:])
            return
          for i in range(start, n):
            tmp.append(lst[i])
            dfs(tmp, i + 1)
            tmp.pop()
        dfs(tmp, 0)
        return result
    print(combine("", 4, 2))
