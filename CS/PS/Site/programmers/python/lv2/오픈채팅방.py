from collections import deque
def solution(record):
    answer = []
    dic ={}
    actions = deque([])
    for s in record:
      spt = s.split()
      actions.append([spt[0], spt[1]])
      if spt[1] not in dic:
        dic[spt[1]] = []
      if len(spt) > 2:
        dic[spt[1]] = spt[2]
    print(dic)
    
    while actions:
      action = actions.popleft()
      if action[0] == 'Enter':
        answer.append(dic[action[1]] + '님이 들어왔습니다.')
      if action[0] == 'Leave':
        answer.append(dic[action[1]] + '님이 나갔습니다.')
    
    return answer
print(solution(["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"]))
