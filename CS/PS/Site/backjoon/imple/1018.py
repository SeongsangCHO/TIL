N, M = map(int, input().split())


def solution(N, M):
    lst = []
    for i in range(N):
        lst.append(list(map(str, input())))
    loop_x, loop_y = N - 7, M - 7
    for x in range(loop_x):
        for y in range(loop_y):
            print(x, y) #시작점 x ~ x + 8, y y + 8까지 8*8정사각형. 우, 하에 있는 원소랑 나랑 겹치면안됨.
    print(lst)
print(solution(N, M))
