from collections import deque
def solution(maps):
    n, m = len(maps), len(maps[0])
    answer = 0
    dir_x = [1, 0, -1, 0]
    dir_y = [0, 1, 0, -1]
    q = deque([[0, 0, 1]])
    candi = []
    cnt = 0
    while q:
        p_pos = q.popleft() #[x,y]
        if maps[p_pos[0]][p_pos[1]] == -1:
          continue
        maps[p_pos[0]][p_pos[1]] = -1
        cnt = p_pos[2]
        if p_pos[0] == n - 1 and p_pos[1] == m - 1:
            candi.append(cnt)
            break
        for i in range(4):
            mov_x = dir_x[i] + p_pos[0]
            mov_y = dir_y[i] + p_pos[1]
            if ((mov_x >= 0 and mov_x < n) and (mov_y >= 0 and mov_y < m) and maps[mov_x][mov_y] == 1 ):
              q.append([mov_x, mov_y, cnt + 1])
    if candi:
      answer = min(candi)
    return -1 if answer == 0 else answer
print(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]))
print(solution([[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]]))
print(solution([[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]))
