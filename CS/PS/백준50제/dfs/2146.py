N = int(input())
lst = [list(map(int, input().split())) for _ in range(N)]
visited = [[False] * N for _ in range(N)]
dx, dy = [-1, 1, 0, 0], [0, 0, -1, 1]
import sys

sys.setrecursionlimit(10 ** 6)

def marking_island(x, y, island_number, border):  # dfs
    global lst
    if lst[x][y] == 0 or visited[x][y] == True:
        return
    lst[x][y] = island_number
    visited[x][y] = True
    for i in range(4):
        mx, my = dx[i] + x, dy[i] + y
        if 0 <= mx < N and 0 <= my < N:
            if lst[mx][my] != 0:
                marking_island(mx, my, island_number, border)
            if lst[mx][my] == 0 and [x, y] not in border[island_number]:  # 테두리
                border[island_number].append([x, y])
    return


def bfs(x, y, mov_cnt, island_number):
    q = [[x, y, mov_cnt]]
    tmp_visited = [[False] * N for _ in range(N)]
    while q:
        i, j, cnt = q.pop(0)
        if tmp_visited[i][j] == True:
            continue
        if lst[i][j] != 0 and lst[i][j] != island_number:
            return cnt - 1
        tmp_visited[i][j] = True
        for idx in range(4):
            mx, my = dx[idx] + i, dy[idx] + j
            if 0 <= mx < N and 0 <= my < N:
                if lst[mx][my] == 0 or lst[mx][my] != island_number:
                    q.append([mx, my, cnt + 1])
    return cnt


def solution(N, lst):
    island_number = 1
    answer = []
    border = {}  # island: [[테두리 좌표], [],,]
    for i in range(N):
        for j in range(N):
            if lst[i][j] != 0 and visited[i][j] == False:
                border[island_number] = []
                marking_island(i, j, island_number, border)
                island_number += 1
    for island_number in border:
        for border_loc in border[island_number]:
            x, y = border_loc
            visited[x][y] = False
            answer.append(bfs(x, y, 0, island_number))
    return min(answer)


print(solution(N, lst))
