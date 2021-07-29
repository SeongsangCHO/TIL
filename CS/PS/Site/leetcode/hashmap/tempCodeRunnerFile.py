class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counter_obj = Counter(nums).most_common(k)
        print(counter_obj)
        answer = []
        for v in counter_obj:
          answer.append(counter_obj[0])
        return answer