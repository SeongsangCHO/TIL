from typing import List


# class Solution:
#     def topKFrequent(self, nums: List[int], k: int) -> List[int]:
#         num_set = {}
#         answer = []
#         for v in nums:
#             if v not in num_set:
#                 num_set[v] = 1
#             else:
#                 num_set[v] += 1
#         num_list = list(num_set.items())
#         sorted_list = sorted(num_list, key=lambda x: (x[1]), reverse=True)
#         for idx in range(k):
#           answer.append(sorted_list[idx][0])
#         return answer
#     print(topKFrequent("", [1, 1, 1, 2, 2, 3], 2))
#     print(topKFrequent("", [1, 2], 2))

from collections import Counter


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter_obj = Counter(nums).most_common(k)
        answer = []
        for v in counter_obj:
            answer.append(v[0])
        return answer
    print(topKFrequent("", [1, 1, 1, 2, 2, 3], 2))
