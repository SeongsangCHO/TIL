def solution(s):
    lst = list(s)
    stk = [lst[0]]
    for v in range(1, len(lst)):
        if (stk and stk[-1] == lst[v]):
            stk.pop()
        else :
            stk.append(lst[v])
    return 1 if len(stk) == 0 else 0