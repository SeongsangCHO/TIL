from typing import List
class Solution:
    def restoreString(self, s: str, indices: List[int]) -> str:
        res = [''] * len(s)
        for index, char in enumerate(s):
          res[indices[index]] = char
        return "".join(res)
    restoreString("","codeleet", [4,5,6,7,0,2,1,3])