N = int(input())


# print(lst)
def solution(N):
  answer = []
  lst = []
  a = 0
  while a < N: # 2차원 lst만들기
    lst.append(list(map(int,input())))
    a+=1
  visited = [[False]*N for _ in range(N)]
  q = []
  pos_x = [-1, 1, 0, 0]
  pos_y = [0, 0, -1, 1]
  for x in range(N):
    for y in range(N):
      house_cnt = 0
      if visited[x][y] == False and lst[x][y] == 1:
        q.append([x,y])
        while q:
          cur_x, cur_y = q.pop(0)
          if visited[cur_x][cur_y] == False and lst[cur_x][cur_y] == 1:
            lst[cur_x][cur_y] = -1
            house_cnt += 1
            visited[cur_x][cur_y] = True
            for i in range(4):
              mov_x, mov_y = cur_x + pos_x[i], cur_y + pos_y[i]
              if mov_x >= 0 and mov_x < N and mov_y >= 0 and mov_y < N and \
                 lst[mov_x][mov_y] == 1 and visited[mov_x][mov_y] == False:
                q.append([mov_x, mov_y])
        answer.append(house_cnt)
  return answer
answer = solution(N)
print(len(answer))
answer.sort()
for i in answer:
  print(i)