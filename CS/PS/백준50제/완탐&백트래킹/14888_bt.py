N = int(input())  # 수의 갯수


def solution():
    lst = list(map(int, input().split()))
    oper_lst = list(map(int, input().split()))  # [+, -, *, /] 순
    candi = []
    oper_c = (['+'] * oper_lst[0]) + (['-'] * oper_lst[1]) + \
        (['*'] * oper_lst[2]) + (['/'] * oper_lst[3])
    print(oper_c)
    visited = [False] * len(oper_c)

    def dfs(cnt, start, lst_sum):

        if start == len(oper_c):
            # 최대, 최소값 계산
            candi.append(lst_sum)
            # visited[cnt] = False
            # return
        else:
            for idx in range(len(oper_c)):
                if visited[idx] == False:
                    # dfs호출
                    if oper_c[idx] == '+':
                        dfs(idx, start + 1, lst_sum + lst[idx + 1])
                    if oper_c[idx] == '-':
                        dfs(idx, start + 1, lst_sum - lst[idx + 1])
                    if oper_c[idx] == '/':
                        dfs(idx, start + 1, int(lst_sum / lst[idx + 1]))
                    if oper_c[idx] == '*':
                        dfs(idx, start + 1, lst_sum * lst[idx + 1])
                    visited[idx] = True
        visited[cnt] = False
    dfs(0, 0, lst[0])
    print(candi)
    return


print(solution())
