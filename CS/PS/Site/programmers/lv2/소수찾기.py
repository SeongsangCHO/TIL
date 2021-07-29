import itertools
def solution(numbers):
    answer = 0
    comb = itertools.permutations(numbers, 3)
    print(list(comb)[0])
    return answer

solution("011")