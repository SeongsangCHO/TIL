N, M = map(int, input().split())
lst = [list(map(int, input().split())) for _ in range(N)]
dx, dy = [-1, 1, 0, 0], [0, 0, -1, 1]
import sys

sys.setrecursionlimit(10 ** 6)

def marking_outside_cheese(x, y):
    if lst[x][y] == -1:
        return
    lst[x][y] = -1
    for i in range(4):
        mx, my = dx[i] + x, dy[i] + y
        if 0 <= mx < N and 0 <= my < M:
            if lst[mx][my] == 0:
                marking_outside_cheese(mx, my)


def is_border(x, y):
    cnt = 0
    for i in range(4):
        mx, my = dx[i] + x, dy[i] + y
        if 0 <= mx < N and 0 <= my < M:
            if lst[mx][my] == -1:
                cnt += 1
    if cnt >= 2:
        return True
    return False


def solution(N, M, lst):
    answer = 0
    loop_cnt = max(N, M)  # 둘 중 큰값이 치즈를 녹이는데 필요한 최대 시간
    marking_outside_cheese(0, 0)  # 치즈 바깥값 -1로 치환
    for _ in range(loop_cnt):
        cheess_loc = []
        for i in range(N):
            for j in range(M):
                if lst[i][j] == 1 and is_border(i, j):  # 치즈가 테두리인지 확인
                    # lst[i][j] = -1 # 테두리면 시간초 추가하고 녹여버림 - 모든 치즈에 대해 녹여야함 한번에
                    cheess_loc.append([i, j])  # 테두리 좌표 추가
                # if lst[i][j] == 0: #녹인 후 0에 해당하는 부분을 찾아서 -1로 치환
                #     marking_outside_cheese(i, j)
        # cheess_loc => 녹을 수 있는 모든 테두리 좌표
        if cheess_loc:  # 녹을 수 있는게 있으면 답 ++
            answer += 1
        for loc in cheess_loc:
            x, y = loc
            marking_outside_cheese(x, y)
            lst[x][y] = -1
            # answer += 1
    return answer


print(solution(N, M, lst))

# 8 9
# 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0
# 0 1 1 0 0 0 1 1 0
# 0 1 0 1 1 1 0 1 0
# 0 1 0 0 1 0 0 1 0
# 0 1 0 1 1 1 0 1 0
# 0 1 1 0 0 0 1 1 0
# 0 0 0 0 0 0 0 0 0
