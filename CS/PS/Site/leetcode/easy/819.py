import re
from collections import Counter
from typing import List
# 파싱, Counter, 2개뽑아서 banned이 아닌 것 반환
class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
      plain_list = re.sub('[^\w]', ' ', paragraph.lower()).split()
      non_double_list = []
      for v in plain_list:
        if (v not in banned):
          non_double_list.append(v)
      if (len(plain_list) == 1):
        return plain_list[0]
      return (Counter(non_double_list).most_common(1)[0][0])
    mostCommonWord("", "a b c hit a b c hit hit",["hit","a"])