N, M = map(int, input().split())
lst = [list(map(int, input().split())) for _ in range(N)]
loc = [list(map(int, input().split())) for _ in range(M)]
def solution():
  # print(lst)
  # print(loc)
  for x in range(N):
    for y in range(1, N):
      lst[x][y] += lst[x][y - 1]

  for loc_lst in loc:
    x1, y1, x2, y2 = loc_lst
    # y2까지
    sum_val = 0
    for i in range(x1 - 1, x2): # 1부터 값이 시작됨
      b = 0
      if y1 >= 2:
        b = lst[i][y1 - 2]
      sum_val += lst[i][y2 - 1] - b
    print(sum_val)
  # print(lst)
  
solution()