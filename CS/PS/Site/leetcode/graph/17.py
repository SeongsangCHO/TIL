from typing import List


class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
      if(not digits):
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

      def dfs(i, combis):
        if len(digits) == i:
          result.append(combis)
          return
        for v in book[int(digits[i])]:
          dfs(i + 1, combis + v)
      dfs(0, "")
      return result
    print(letterCombinations("","23"))