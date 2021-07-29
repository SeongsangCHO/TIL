import itertools
def solution(numbers):
    answer = []
    combis = list(itertools.combinations(numbers, 2))
    s = set([])
    for i in combis:
        s.add(i[0] + i[1])
    lst_s = list(s)
    lst_s.sort()
    return list(lst_s)