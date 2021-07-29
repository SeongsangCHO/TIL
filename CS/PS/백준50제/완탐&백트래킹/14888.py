# 0. 연산자 순열만들어서 그 순서대로 계산 후 최대, 최소값 구하기
# 1. 백트래킹으로 풀기 -> 이거 자체가 순열아닌가 ?
## 1.1 연산자갯수(N-1)만큼 반복문 돌려서 idx == N - 1일 때 연산값 계산함.
### 전역으로 선언된 max, min값 갱신. 
import itertools
import collections
N = int(input()) #  수의 갯수

def solution(N):
    lst = list(map(int, input().split()))
    candi = []
    oper_lst = list(map(int, input().split())) # [+, -, *, /] 순
    oper_c = (['+'] * oper_lst[0]) + (['-'] * oper_lst[1]) + (['*'] * oper_lst[2]) + (['/'] * oper_lst[3])
    permu = collections.deque(itertools.permutations(oper_c, len(oper_c)))
    for per in permu:
        tmp = lst[:]
        for i in range(len(per)):
            if per[i] == '*':
                tmp[i + 1] = tmp[i] * tmp[i + 1]
            if per[i] == '-':
                tmp[i + 1] = tmp[i] - tmp[i + 1]
            if per[i] == '/':
                if (tmp[i] < 0):
                  tmp[i] *= -1
                  tmp[i + 1] = (int(tmp[i] / tmp[i + 1])) * -1
                else:
                  tmp[i + 1] = int(tmp[i] / tmp[i + 1])
            if per[i] == '+':
                tmp[i + 1] = tmp[i] + tmp[i + 1]
        candi.append(tmp[-1])
    # print(tmp, len(permu), oper_c)
    print(max(candi))
    print(min(candi))
solution(N)