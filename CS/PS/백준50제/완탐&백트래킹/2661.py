N = int(input())
candidate = []
def check_double(answer):
  for i in range(1,int(len(answer) // 2)):
    # print(i, 'i', answer)
    
    if answer[-i:] == answer[-i * 2: - i]:
      return True

  return True if answer[0:len(answer) // 2] == answer[len(answer) // 2:]  or answer[-1] == answer[-2] else False

def dfs(idx, answer):
  if candidate:
    return
  if idx >= 2 and check_double(answer):
      return 
  if idx == N:
    candidate.append(''.join(answer))
    return 
  for i in range(1, 4):
    answer.append(str(i))
    if dfs(idx + 1, answer):
      return
    answer.pop()
  return 
answer = []
dfs(0, answer)
print(candidate[0])
