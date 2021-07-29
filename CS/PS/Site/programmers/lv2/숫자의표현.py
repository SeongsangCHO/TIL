def solution(n):
    answer = 1
    i = 1
    while i <= int(n / 2):
        tmp = i
        sum_val = 0
        while sum_val < n:
            sum_val += tmp
            tmp += 1
            # print(sum_val, tmp)
        if sum_val == n:
            answer += 1
        i += 1
    return answer
print(solution(15))
