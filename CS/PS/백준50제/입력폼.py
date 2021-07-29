# # 7 라인수
# # 0110100 * 7 <N*N>문제

N = int(input())
def make_lst(N):
  lst = []
  for _ in range(N):
    lst.append(list(map(int,input())))  
  return lst
def solution(N):
  lst = make_lst(N)
  answer = 0
  return answer
print(solution(N))

# 4 6 N * M
# 123456 * N <N*M>문제

N, M = map(int, input().split())
def make_lst(N):
  lst = []
  for i in range(N):
    lst.append(list(map(int,input())))
  
  return lst
def solution(N):
  lst = make_lst(N)
  answer = 0
  print(lst)
  return answer
print(solution(N))
