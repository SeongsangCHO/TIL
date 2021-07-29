def solution(new_id):
    new_id = new_id.lower()
    lst = []
    for c in new_id:
        if c.isalnum() or c == '-' or c == '_' or c == '.':
            if c == '.' and lst and lst[-1] == '.':
                continue
            lst.append(c)
        else:
            continue
    if lst and lst[0] == '.':
        lst.pop(0)
    if lst and lst[-1] == '.':
        lst.pop()
    if not lst:
        lst.append('a')
    if len(lst) >= 16:
        lst = lst[:15]
        if lst[-1] == '.':
            lst.pop()
    while len(lst) < 3:
        lst.append(lst[-1])
    return ''.join(lst)


print(solution("...!@BaT#*..y.abcdefghijklm"))
print(solution(""))
print(solution("z-+.^."))
print(solution("=.="))
