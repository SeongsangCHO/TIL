# 18:30 ~ #18:38

def solution(n, lost, reserve):
    answer = 0
    #4번은 3, 5번에게만 빌릴 수 있음
    cnt = [0] * (n + 1)
    for l in lost:
        cnt[l] -= 1
    for re in reserve:
        cnt[re] += 1
    for idx in range(1, len(cnt) - 1):
        if cnt[idx] == -1 and cnt[idx - 1] == 1:
            cnt[idx] += 1
            cnt[idx - 1] -= 1
        elif cnt[idx] == -1 and cnt[idx + 1] == 1:
            cnt[idx] += 1
            cnt[idx + 1] -= 1
    for i in range(1, len(cnt)):
        if cnt[i] >= 0:
            answer += 1
    return answer