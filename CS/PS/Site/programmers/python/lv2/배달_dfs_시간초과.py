            #마을갯수, 경로, 제한시간
def solution(N, road, K):
    answer = 0
    dic = {}
    visited = [False] * (N + 1)
    # 인접 리스트 만들기
    # {
    # 1: [[2, 1], [4, 2]], 
    # 2: [[1, 1], [3, 3], [5, 2]], 
    # 3: [[2, 3], [5, 1]], 
    # 5: [[2, 2], [3, 1], [4, 2]], 
    # 4: [[1, 2], [5, 2]]}
    for v in road:
      f, t, c = v
      if f not in dic:
        dic[f] = []
      if t not in dic:
        dic[t] = []
      dic[f].append([t, c])
      dic[t].append([f, c])
    ans = {}
    def dfs(cost, curr):
      if cost > K or visited[curr] == True:
        return
      if cost <= K:
        ans[curr] = cost
      for v in dic[curr]:
        visited[curr] = True
        dfs(cost + v[1] , v[0])
        visited[curr] = False
    dfs(0, 1)
    return len(ans)
print(solution(5, [[1,2,1],[2,3,3],[5,2,2],[1,4,2],[5,3,1],[5,4,2]], 3))
print(solution(3, [[1,2,1],[2,3,3]], 5))
