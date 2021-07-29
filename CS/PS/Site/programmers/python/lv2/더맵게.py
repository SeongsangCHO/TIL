import heapq

def solution(scoville, K):
    answer = 0
    data = [3,2,1,0,56,41]
    heapq.heapify(scoville)
    while scoville[0] < K:
        if len(scoville) >= 2:
            one = heapq.heappop(scoville)
            two = heapq.heappop(scoville)
            heapq.heappush(scoville, one + (two * 2))
            answer += 1
        else:
            return -1
    return answer