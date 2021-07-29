# 인풋이 꼭 저렇게 들어오는건아님,, 양방향 그래프로 생각해서 양쪽 추가해야함;
N = int(input())
M = int(input())
# 인접행렬, 인접리스트
#1 : [1,5]
#2 : [3]
#3 : []
#4 : [7]
#5 : [2]
#6 : []
#7 : []


# 1: [2,3,7]
# 2: [1,3]
# 3: [1,2,4]
# 4: [3,2,5]
# 5: []
# 6: [7]
# 7: [1]

def solution(N, M):

    lst = [list(map(int, input().split())) for _ in range(M)]
    ad_lst = {}
    answer = 0
    visited = [False] * (N + 1)
    for i in range(1, N + 1):
        if i not in ad_lst:
            ad_lst[i] = []
    for pair in lst:
        from_c, to_c = pair
        ad_lst[from_c].append(to_c)
        ad_lst[to_c].append(from_c)

    def dfs(ad_lst, from_ct, visited):
        if len(ad_lst[from_ct]) == 0:
            return
        for com in ad_lst[from_ct]:
            if visited[com] == False:
                visited[com] = True
                dfs(ad_lst, com, visited)
        return
    
    dfs(ad_lst, 1, visited)
    for i in visited:
        if i == True:
            answer += 1
    if visited[1] == True:
        answer -= 1
    return answer


print(solution(N, M))
