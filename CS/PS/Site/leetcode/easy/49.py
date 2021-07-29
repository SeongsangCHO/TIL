from typing import List
import collections


class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        res = collections.defaultdict(list)
        for v in strs:
            res[''.join(sorted(v))].append(v)
        return res.values()
    groupAnagrams("", ["eat", "tea", "tan", "ate", "nat", "bat"])
