from collections import deque

map = [
  [1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];

n = 5
m = 6

dirX = [0, 0, -1 ,1]
dirY = [-1, 1, 0, 0]
def bfs(x, y):
  queue = deque()

  queue.append((x, y))
  while queue:
    x, y = queue.popleft()
    
    for i in range(4):
      nX = x + dirX[i]
      nY = y + dirY[i]

      if nX <= -1 or nX >= n or nY <= -1 or nY >= m:
        continue
      if map[nX][nY] == 0:
        continue
      if map[nX][nY] == 1:
        map[nX][nY] = map[x][y] + 1
        queue.append((nX, nY))
  return map[n - 1][m - 1]

print(bfs(0, 0))
