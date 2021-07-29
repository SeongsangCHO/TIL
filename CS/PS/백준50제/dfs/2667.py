N = int(input()) #  수의 갯수


def solution():
  dx, dy = [-1, 1, 0, 0], [0, 0, -1, 1]
  lst = []
  answer = []
  # print(type(N), M)
  for i in range(N):
    lst.append(list(map(int,input())))
  visited = [[False] * N for i in range(N)]
  cnt = 1
  def dfs(x, y, cnt):
    if visited[x][y] == True:
      return cnt
    visited[x][y] = True
    for i in range(4):
      mx, my = dx[i] + x, dy[i] + y
      if 0 <= mx < N and 0 <= my < N:
        if lst[mx][my] == 1 and visited[mx][my] == False:
          lst[x][y] = 0
          cnt = dfs(mx, my, cnt + 1)

    return cnt
  for x in range(N):
    for y in range(N):
      if visited[x][y] == False and lst[x][y] == 1:
        cnt = dfs(x,y, cnt)
        answer.append(cnt)
        cnt = 1
  print(len(answer))
  answer.sort()
  for i in answer:
    print(i)
solution()