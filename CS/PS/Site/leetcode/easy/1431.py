from typing import List


class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        maxValue = max(candies)
        result = []
        for a in candies:
          if (maxValue <= (a + extraCandies)):
            result.append(True);
          else:
            result.append(False);
        return result
    kidsWithCandies("",[2, 3, 5, 1, 3], 3)
