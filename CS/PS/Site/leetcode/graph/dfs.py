
import collections
# graph = {
#     1: [2, 3, 4],
#     2: [5],
#     3: [5],
#     4: [],
#     5: [6, 7],
#     6: [],
#     7: [3],
# }
graph = {
    1: [2, 3, 4],
    2: [],
    3: [6],
    4: [],
    5: [],
    6: [],
}


def bfs(start, bfs_visited, bfs_answer):
    que = collections.deque(graph[start])
    print(que)
    bfs_answer.append(start)
    bfs_visited[start] = True
    while len(que) > 0:
        node = que.popleft()
        bfs_answer.append(node)
        for v in graph[node]:
            if v not in bfs_answer and bfs_visited[v] == False:
                que.append(v)
                bfs_visited[v] = True
    return bfs_answer


def solution():
    bfs_answer, answer = [], []
    visited = [False] * 8
    bfs_visited = [False] * 8
    dfs(1, visited, answer)
    print(bfs(1, bfs_visited, bfs_answer))
    return answer


def dfs(node, visited, answer):
    if(visited[node] == True):
        return
    visited[node] = True
    answer.append(node)
    for v in graph[node]:
        if visited[v] == False:
            dfs(v, visited, answer)


print(solution())
