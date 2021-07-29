# 18:03 ~ 18:10
def solution(answers):
    answer = []
    one = [1,2,3,4,5] # 5
    two = [2,1,2,3,2,4,2,5] # 8
    three = [3,3,1,1,2,2,4,4,5,5] # 10
    
    cnt = [0,0,0]
    for idx,v in enumerate(answers):
        if v == one[idx % 5]:
            cnt[0] += 1
        if v == two[idx % 8]:
            cnt[1] += 1
        if v == three[idx % 10]:
            cnt[2] += 1
    max_val = max(cnt)
    for idx, c in enumerate(cnt):
        if max_val == c:
            answer.append(idx + 1)
    return answer