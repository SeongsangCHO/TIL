from itertools import combinations
import collections
N, M = map(int, input().split())
lst = [list(map(int, input().split())) for _ in range(N)]
candidate = []

def map_copy():
  b_copy = [[0] * M for _ in range(N)] # 2차원 리스트
  for x in range(N): # copy
    for y in range(M):
      b_copy[x][y] = lst[x][y]
  return b_copy
pos_x = [-1, 1, 0, 0]
pos_y = [0, 0, -1, 1]

def make_virus_map(b_copy):
  deq = collections.deque()
  for x in range(N):
    for y in range(M):
      if b_copy[x][y] == 2:
        deq.append([x,y])
  while deq:
    cur_x, cur_y = deq.popleft()
    for i in range(4):
      mov_x, mov_y = cur_x + pos_x[i], cur_y + pos_y[i]
      if mov_x >= 0 and mov_x < N and mov_y >= 0 and mov_y < M:
        if b_copy[mov_x][mov_y] == 0:
          b_copy[mov_x][mov_y] = 2
          deq.append([mov_x, mov_y])
  return b_copy

def set_wall(wall_pos_lst):
  pos1, pos2, pos3 = wall_pos_lst # [x,y] ,[x1,y1] , [x2, y2]
  b_copy = map_copy() # deepcopy

  b_copy[pos1[0]][pos1[1]] = 1 # set_wall
  b_copy[pos2[0]][pos2[1]] = 1
  b_copy[pos3[0]][pos3[1]] = 1
  
  virus_map = make_virus_map(b_copy)
  cnt = 0
  for x in range(N):
    for y in range(M):
      if b_copy[x][y] == 0:
        cnt += 1
  return cnt

def solution(N,M,lst):
  wall_candidate = []
  for x in range(N):
    for y in range(M):
      if lst[x][y] == 0:
        wall_candidate.append([x, y])
  combis = list(combinations(wall_candidate, 3)) # 벽이 들어올 수 있는 조합들 [x,y]
  candi = []
  for i in combis:
    candi.append(set_wall(i))
  return max(candi)

print(solution(N,M, lst))


# 
#100
#000
#200


#100
#100
#200

# 종료조건 cnt = 3
#