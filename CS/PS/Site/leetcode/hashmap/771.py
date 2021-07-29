from collections import Counter


class Solution(object):
    def numJewelsInStones(self, jewels, stones):
        """
        :type jewels: str
        :type stones: str
        :rtype: int
        """
        freq = {}
        answer = 0
        for v in stones:
            if v not in freq:
                freq[v] = 1
            else:
                freq[v] += 1
        for v in jewels:
          if v in freq:
            answer += freq[v]
        return answer
    numJewelsInStones("", "aA", "aAAbbbbbb")
