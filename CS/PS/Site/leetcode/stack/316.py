from collections import Counter


class Solution(object):
    def removeDuplicateLetters(self, s):
        """
        :type s: str
        :rtype: str
        """
        counter = Counter(s)
        stk = []
        for char in s:
          counter[char] -= 1
          if char in stk:
            continue
          while stk and stk[-1] > char and counter[stk[-1]] > 0:
            stk.pop()
          stk.append(char)
        return ''.join(stk)
    removeDuplicateLetters("", "abcdef")
