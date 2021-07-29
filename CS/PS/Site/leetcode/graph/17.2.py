from typing import List


class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if digits == "":
          return []
        book = {
            2: "abc",
            3: "def",
            4: "ghi",
            5: "jkl",
            6: "mno",
            7: "pqrs",
            8: "tuv",
            9: "wxyz"
        }
        result = []
        def dfs(idx, path):
          if(len(path) == len(digits)):
            result.append(path)
            return
          for v in range(idx, len(digits)):
            for c in book[int(digits[v])]:
              dfs(v + 1, path + c)
        dfs(0, "")
        return result
    print(letterCombinations("", "23"))
    
