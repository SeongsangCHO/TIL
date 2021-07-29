answer = 0

def dfs(numbers, target, sum, index):
  global answer
  length = len(numbers)
  if (length <= index):
    if (sum == target):
      answer += 1
    return ;
  dfs(numbers, target, sum + numbers[index], index + 1)
  dfs(numbers, target, sum - numbers[index], index + 1)

def solution(numbers, target):
  global answer
  dfs(numbers, target, 0, 0)
  print(answer)
  return answer