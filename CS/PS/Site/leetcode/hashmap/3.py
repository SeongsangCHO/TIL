class Solution(object):
    def lengthOfLongestSubstring(self, s):
        """
        :type s: str
        :rtype: int
        """
        if(s == ""):
            return 0
        candi_set = set()
        for idx in range(len(s)):
          move_idx = idx
          compare = ""
          while move_idx < len(s) and s[move_idx] not in compare:
            compare += s[move_idx]
            move_idx += 1
          candi_set.add(compare)
        
        print(candi_set)
        return len(max(candi_set, key=len))
    print(lengthOfLongestSubstring("", "abcabcbb"))
    print(lengthOfLongestSubstring("", "abcdd"))
    print(lengthOfLongestSubstring("", "pwwkew"))
    print(lengthOfLongestSubstring("", "au"))
    print(lengthOfLongestSubstring("", "dvdf"))
    print(lengthOfLongestSubstring("", "bbbbb"))
