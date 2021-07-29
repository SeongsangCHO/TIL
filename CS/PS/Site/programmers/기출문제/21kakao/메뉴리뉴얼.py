import itertools
from collections import Counter


def solution(orders, course):
    answer = []
    combis = []
    combi_lst = []
    orders.sort()
    for i in course:
        for order in orders:
            combis = (list(itertools.combinations(order, i)))
            for combi in combis:
                combi_str = ''.join(combi)
                combi_lst.append(''.join(sorted(combi_str)))
    dic = {}

    for combi in combi_lst:
        if combi not in dic:
            dic[combi] = 1
        else:
            dic[combi] += 1
    dic = list(filter(lambda x: x[1] > 1, dic.items()))
    max = {}
    for v in dic:
        if len(v[0]) not in max:
            max[len(v[0])] = v[1]
        elif max[len(v[0])] < v[1]:
            max[len(v[0])] = v[1]

    for v in dic:
        print(v)
        if max[len(v[0])] == v[1]:
            answer.append(v[0])
    answer.sort()
    return answer


    # A B C F G를 2,3,4,5의 조합으로 만들고
    # 다음조합부터
# print(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4]))
print(solution(["XYZ", "XWY", "WXA"], [2, 3, 4]))
