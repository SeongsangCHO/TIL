import collections
import copy
N, M = map(int, input().split())
lst = [list(map(int, input().split())) for _ in range(N)]
candidate = []
def make_virus(board):
  pos_x, pos_y = [-1, 1, 0, 0], [0, 0, -1, 1]
  b_copy = [[0] * M for i in range(N)]
  for x in range(N):
    for y in range(M):
      b_copy[x][y] = board[x][y]
  virus_cnt = 0
  deque = collections.deque()
  for x in range(N):
    for y in range(M):
      if b_copy[x][y] == 2:
        deque.append([x,y])
        virus_cnt += 1
  while deque:
    cur_x, cur_y = deque.popleft()
    for i in range(4):
      mov_x, mov_y = cur_x + pos_x[i], cur_y + pos_y[i]
      if mov_x >= 0 and mov_x < N and mov_y >= 0 and mov_y < M:
        if b_copy[mov_x][mov_y] == 0:
          b_copy[mov_x][mov_y] = 2
          virus_cnt += 1
          deque.append([mov_x, mov_y])
  return virus_cnt
def search_wall(cnt, board):
  if cnt == 3:
    virus_amount = make_virus(board)
    print(board)
    candidate.append(virus_amount)
    # 3가지 곳에 벽 박기
    return
  for x in range(N):
    for y in range(M):
      if board[x][y] == 0:
        board[x][y] = 1 # 벽박기
        search_wall(cnt + 1, board)
        board[x][y] = 0 # 원래대로
  return

def solution(N,M,lst):
  answer = 0
  for x in range(N):
    for y in range(M):
      if lst[x][y] == 1:
        answer += 1
  search_wall(0, copy.deepcopy(lst))
  board_size = N * M 
  answer += min(candidate) + 3

  return board_size - answer

print(solution(N,M, lst))