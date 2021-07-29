import collections
import itertools


def solution(orders, course):
    result = []

    for course_size in course:
        order_combi = []
        for order in orders:
            order_combi += itertools.combinations(sorted(order), course_size)
        most_ordered = collections.Counter(order_combi).most_common()
        for k, v in most_ordered:
            if v > 1 and v == most_ordered[0][1]:
                k_str = ''.join(k)
                result.append(k_str)
    result.sort()
    return result


print(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4]))
# print(solution(["XYZ", "XWY", "WXA"], [2, 3, 4]))
