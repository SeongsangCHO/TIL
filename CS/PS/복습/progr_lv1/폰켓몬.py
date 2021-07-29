# combis
# 17:31 ~ 17:46
def solution(nums):
    return int(len(nums) / 2) if len(set(nums)) > int(len(nums) / 2) else len(set(nums))
