import json
def solution(s):
    answer = []
    candi = []
    lst = []
    idx = 0
    json_str = ""
    
    while idx != len(s):
        if s[idx] == '{':
            json_str += '['
        elif s[idx] == '}':
            json_str += ']'
        else :
            json_str += s[idx]
        idx += 1
    lst = json.loads(json_str)
    lst.sort(key=len)
    dic = {}
    for r in lst:
        for v in r:
            if v not in dic:
                answer.append(int(v))
                dic[v] = 1
    return answer