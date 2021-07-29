n = int(input())

plans = input().split()

x, y = 1, 1

move = ['L', 'R', 'U', 'D']
dir_x = [0, 0, -1, 1]
dir_y = [-1, 1, 0, 0]

for plan in plans:
  for index in range(len(move)):
    if plan == move[index]:
      print(move[index])
      if ((x + dir_x[index]) >= 1 and (y + dir_y[index]) >= 1
      and (x + dir_x[index]) <= n and (y + dir_y[index]) <= n):
        x += dir_x[index]
        y += dir_y[index]
print(x, y)
