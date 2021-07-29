n = input()

row = int(n[1])

col = int((ord(n[0]) - ord('a'))) + 1
x, y = row, col
dir = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
    [-1, -2],
    [1, -2],
    [-1, 2],
    [1, 2]
]

result = 0
for idx in range(len(dir)):
  nx = x + dir[idx][0]
  ny = y + dir[idx][1]
  if ((nx <= 8 and nx >= 1) and (ny <= 8 and ny >= 1)):
    result += 1
print(result)