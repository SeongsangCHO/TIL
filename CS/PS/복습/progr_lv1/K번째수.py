# 18:11 ~ 18:14
def solution(array, commands):
    answer = []
    for com in commands:
        start, end, pos = com
        tmp = array[start - 1: end]
        tmp.sort()
        answer.append(tmp[pos - 1])
    return answer