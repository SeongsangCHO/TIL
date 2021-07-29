from typing import List

class Solution:
    def numJewelsInStones(self, jewels: str, stones: str) -> int:
      result = 0
      dictionary = dict()
      for v in list(jewels):
        dictionary[v] = 0
      for v in list(stones):
        if (v in dictionary):
          result = result + 1
      return result
    numJewelsInStones("", "aA", "aAAbbbbb")    
