# 18:14 ~ 18:27
import itertools
import math
def is_prime(num):
    sqrt = int(math.sqrt(num))
    for i in range(2, sqrt + 1):
        if num % i == 0:
            return False
    return True
    
def solution(nums):
    answer = 0
    combis = list(map(list,itertools.combinations(nums, 3)))
    for combi in combis:
        if is_prime(sum(combi)):
            answer += 1
    return answer