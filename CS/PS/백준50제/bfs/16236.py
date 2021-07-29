# 거리가 같은 물고기가 있을 때, 가장 위에있는 것을 먼저, 같은 라인이면 가장 왼쪽을 먹음
# 처음 아기상어 크기는 2
# 물고기 먹으면 0으로 빈칸처리, 자신 크기와 같은 수를 먹으면 크기가 1 증가
# 예, 크기 2, 2보다 작은 것만 먹음(1) = 2마리, 크기 1 증가


N = int(input())
lst = [list(map(int, input().split())) for _ in range(N)]

def checking_need_help(lst): # 0 갯수가 N^2 , 즉 먹을게 없으면 True반환
  cnt = 0
  for x in range(N):
    for y in range(N):
      if lst[x][y] == 0:
        cnt += 1
  return True if cnt == (N*N) else False

dx= [-1, 1, 0, 0]
dy =[0, 0, -1, 1]

import collections

def bfs(q, lst,visited):
  mov_cnt = 0
  eat_cnt = 0
  size = 2
  eat_flag = False
  while q:
    loop_cnt = len(q)
    print(mov_cnt, lst,size)
    
    q = collections.deque(sorted(q, key=lambda  x: (x[0],x[1]))) # sorted

    for _ in range(loop_cnt):
      cx, cy = q.popleft()
      if lst[cx][cy] > 0 and lst[cx][cy] < size :
        #냠냠
        eat_cnt += 1
        lst[cx][cy] = 0
        if eat_cnt == size:
          size += 1
          eat_cnt = 0
        q = collections.deque()
        visited = set([(cx, cy)])
        eat_flag = True

      for i in range(4):
        mx, my = cx + dx[i], cy + dy[i]
        if 0 <= mx < N and 0 <= my < N and (mx,my)  not in visited:
          if lst[mx][my] <= size:
            visited.add((mx,my))
            q.append([mx, my])
      if eat_flag:
        eat_flag = False
        break
    if checking_need_help(lst):
      return mov_cnt
    mov_cnt += 1
  return mov_cnt





def solution(N):
  start = 0
  answer = 0
  q = collections.deque()
  for x in range(N):
    for y in range(N):
      if lst[x][y] == 9:
        start = [x,y] # 아기상어 좌표, size
        lst[x][y] = 0
        visited = set([(x,y)])
        

  q.append(start)
  answer = bfs(q, lst, visited)

  return answer

  # 먹을 수 있는 최단거리 계산,

print(solution(N))


# 0회전 상어위치찾기 x, y 좌표

# 1회전, 1인것찾기, x,y,상어와의 거리를 담는 큐 생성
# 


# 1 answer : 0
# 3
# 0 0 0
# 0 0 0
# 0 9 0

#2 answer : 3
# 3
# 0 0 1
# 0 0 0
# 0 9 0

#3 answer : 14
# 4
# 4 3 2 1
# 0 0 0 0
# 0 0 9 0
# 1 2 3 4

