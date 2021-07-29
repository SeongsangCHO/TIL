map = [
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [0, 1, 0, 1, 0],
];

n = 4
m = 5
result = 0
def dfs(x, y):
  if x <= -1 or x >= n or y <= -1 or y >= m:
    return False
  if map[x][y] == 0:
    map[x][y] = 1
    dfs(x, y + 1)
    dfs(x, y - 1)
    dfs(x + 1, y)
    dfs(x - 1, y)
    return True
  return False

for i in range(n):
  for j in range(m):
    if dfs(i, j) == True:
      result += 1


print(result)