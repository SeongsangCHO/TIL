def solution(s):
    answer = 0
    candi = []
    if len(s) < 4:
      return len(s)
    for unit in range(1, int(len(s) / 2) + 1):
      tmp_s = ""
      org_s = s[0:unit] # 1 // [0:2] ab
      idx = unit # 2
      cnt = 1
      while idx < len(s): # 4 < 16
        comp_s = s[idx: idx + unit] # s[14:16] cb
        if org_s == comp_s:
          cnt += 1
        else:
          if cnt > 1:
            tmp_s += str(cnt) + org_s
          else :
            tmp_s += org_s
          org_s = comp_s[:] # s[12:14] cb
          cnt = 1
        idx += unit
      if cnt > 1:
        tmp_s += str(cnt) + comp_s
      else:
        tmp_s += comp_s
      candi.append(tmp_s)
    return len(min(candi, key=len))

print(solution("aabbaccc")) # 2a2ba3c
# print(solution("aaaa"))
# print(solution("ababcdcdababcdcd"))
