# R, C  2 x 4 배열
import sys
sys.setrecursionlimit(10000)
visited = [False] * 26

R, C = map(int, input().split())

dx, dy = [-1, 1, 0, 0], [0, 0, -1, 1]


max_val = 0


def solution():
    lst = []
    for _ in range(R):
        lst.append(list(map(str, input())))
    def dfs(i, j, cnt, al_idx):
        global max_val
        if visited[al_idx] == True and cnt > 26:
            return cnt
        visited[al_idx] = True
        for idx in range(4):
            mx, my = dx[idx] + i, dy[idx] + j
            if 0 <= mx < R and 0 <= my < C:
                if visited[ord(lst[mx][my]) - 65] == False:
                    cnt += 1
                    cnt = dfs(mx, my, cnt, ord(lst[mx][my]) - 65)
                    cnt -= 1
        visited[al_idx] = False
        if max_val < cnt:
            max_val = cnt
        return cnt
    dfs(0, 0, 1, ord(lst[0][0]) - 65)
    print(max_val)


solution()
