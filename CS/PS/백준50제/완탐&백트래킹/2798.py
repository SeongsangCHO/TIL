N, M = map(int, input().split())

answer = 0


def recur(lst, start, sum, cnt, visited):  # lst, 2, 11, 2
    global answer
    if cnt > 3 and visited[start] == True:
        return
    if cnt == 3:
        if sum <= M and answer < sum:
            answer = sum
            return
    for i in range(start, (len(lst))):
        recur(lst, i + 1, sum + lst[i], cnt + 1, visited)

    return


def solution(N):
    visited = [False] * N
    lst = list(map(int, input().split()))
    recur(lst, 0, 0, 0, visited)
    return answer


print(solution(N))
