from typing import List


def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)  # does not show return value here


factorial(2)  # shows return value here


class Solution:
    def longestPalindrome(self, s: str) -> str:
        max_length = -1
        res = ''
        print("hello")
        for i in range(0, len(s)):
            k = len(s)
            for j in range(i, len(s)):
                tmp = s[i:k]
                if(tmp == tmp[::-1] and max_length < len(tmp)):
                    max_length = k - i
                    res = ''.join(tmp)
                    if(max_length > int(len(s) / 2)):
                        return True
                    break
                k = k - 1
        print("hello2")
        return True
    print(longestPalindrome("", "abb"))
