class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        dict = {
          ")":"(",
          "]":"[",
          "}":"{"
        }
        stk = []
        arr = list(s)
        for v in arr:
          if v not in dict:
            stk.append(v)
          elif len(stk) > 0 and stk.pop() != dict[v]:
            return False
          else:
            return False
        return True