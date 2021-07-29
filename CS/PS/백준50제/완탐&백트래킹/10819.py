from itertools import permutations
N = int(input())
lst = list(map(int, input().split()))


def solution(N):
    global lst
    permu = list(map(list, permutations(lst)))
    answer = 0
    for per in permu:
        sum = 0
        for i in range(len(lst) - 1):
            sum += abs(per[i] - per[i + 1])
        if sum > answer:
            answer = sum

    return answer


print(solution(N))
