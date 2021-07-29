import copy
import sys
sys.setrecursionlimit(15000)
N = int(input())
"""
  N * N 사각형 중, 최소 ~ 최대까지 수 사이에서
  특정 숫자일 때 최대값 구하기
5
6 8 2 6 2
3 2 3 4 6
6 7 3 3 2
7 2 5 3 6
8 9 5 2 7

min 2,3,4,5,6,7 < max 8 -> 안전지대 초기값 0
2 ~ 7까지 안전지대 맵 만들면서 영역 카운팅<dfs> -> 최대값 리턴
100 * 100, 높이도 100 => 100 ^ 3 + 안전영역 카운팅
"""
lst = [list(map(int, input().split())) for _ in range(N)]


def find_max():
    max_val = -1
    for x in range(N):
        line_max = max(lst[x])
        if line_max > max_val:
            max_val = line_max
    return max_val


def find_min():
    min_val = 101
    for x in range(N):
        line_min = min(lst[x])
        if line_min < min_val:
            min_val = line_min
    return min_val


def copy_map(map):
    lst = [[0] * N for i in range(N)]
    for i in range(N):
        for j in range(N):
            lst[i][j] = map[i][j]
    return lst


dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]
max_val, min_val = -sys.maxsize, sys.maxsize

for i in range(N):
    max_val = max(max_val, max(lst[i]))
    min_val = min(min_val, min(lst[i]))


def solution():
    answer = 1

    def dfs(i, j, standard):
        if tmp_map[i][j] <= standard:
            return
        tmp_map[i][j] = 0
        for idx in range(4):
            mx, my = dx[idx] + i, dy[idx] + j  # 아이 ㅆ..
            if 0 <= mx < N and 0 <= my < N and tmp_map[mx][my] > standard:
                dfs(mx, my, standard)

    for standard in range(min_val, max_val + 1):
        cnt = 0
        tmp_map = copy.deepcopy(lst)  # 이거 떄문 X
        # copy_map(lst)  # deep copy

        for i in range(N):
            for j in range(N):
              # 안전영역 카운팅
                if tmp_map[i][j] > standard:
                    dfs(i, j, standard)
                    cnt += 1
        answer = max(answer, cnt)
    print(answer)


solution()
# 뭐가달라 아오!!@~!
