def permute(n, k):
  lst = [n for n in range(1, n+1)]
  
  visited = [False for n in range(n)]
  result = []
  tmp = []
  def dfs(cnt):
    if cnt == k:
      result.append(tmp[:])
    for i in range(n):
      if visited[i] == True:
        continue
      visited[i] = True
      tmp.append(lst[i])
      dfs(cnt + 1)
      tmp.pop()
      visited[i] = False
  dfs(0)
  return result
print(permute(5, 3))