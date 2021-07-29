n = int(input())

result = 0
for i in range(0, n + 1):
  if (i % 10 == 3):
    result += 3600
  else:
    result += 1575
print(result)
