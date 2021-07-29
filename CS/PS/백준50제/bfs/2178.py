import collections
N, M = map(int, input().split())


def solution(N, M):
    lst = []
    deque = collections.deque([[0, 0, 0]])
    for i in range(N):
        lst.append(list(map(int, input())))
    pos_x = [-1, 1, 0, 0]
    pos_y = [0, 0, -1, 1]
    mov_cnt = 0
    while deque:
        cur_x, cur_y, mov_cnt = deque.popleft()
        if cur_x == N - 1 and cur_y == M - 1:
            return mov_cnt + 1
        if lst[cur_x][cur_y] == 1:
            lst[cur_x][cur_y] = 2  # visited
            for i in range(4):
                mov_x, mov_y = cur_x + pos_x[i], cur_y + pos_y[i]
                if mov_x >= 0 and mov_x < N and mov_y >= 0 and mov_y < M and\
                        lst[mov_x][mov_y] == 1:
                    deque.append([mov_x, mov_y, mov_cnt + 1])

    return mov_cnt


print(solution(N, M))
