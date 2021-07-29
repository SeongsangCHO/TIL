def solution(d, budget):
    answer = 0
    d.sort()
    sum_ = 0
    for i in range(0, len(d)):
        if sum_ < budget:
            sum_ += d[i]
            if sum_ > budget:
                return answer
            answer+=1
    return answer