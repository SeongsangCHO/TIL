
def solution(N, road, K):
    answer = 0
    q = [ [1, road[0][1], road[0][2]] ]
    visited = [False] * (N + 1)
    dic = {}
    for v in road:
      f, t, c = v
      if f not in dic:
        dic[f] = []
      if t not in dic:
        dic[t] = []
      dic[f].append([f,t,c])
      dic[t].append([t,f,c])
    print(dic)
    ans = {}
    while q:
      print(q)
      start, end,cost = q.pop(0)
      visited[end] = True
      idx = 0
      if cost <= K:
        ans[start] = 1
        print(ans)

      if cost > K:
        continue
      for v in dic[end]:
        if v[0] == start:
          continue
        q.append([v[0], v[1], cost + v[2]])
    
    return answer
print(solution(5, [[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]], 3))
