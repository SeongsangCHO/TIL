# 주어지는 2개의 리스트로
# 교,차, 합집합 구하기
# inter, comple, rel, union
def inter(a, b):
    result = []
    dic = {}
    for v in a:
        if v not in dic:
            dic[v] = 1
        else:
            dic[v] += 1
    for v in b:
        if v not in dic:
            dic[v] = 1
        else:
            dic[v] += 1
    for v in dic.items():
      if v[1] >= 2:
        result.append(v[0])
    return result


def rel(a, b):
    result = []
    dic = {}
    for v in a:
        if v not in dic:
            dic[v] = 1
        else:
            dic[v] += 1
    for v in b:
        if v not in dic:
            dic[v] = 1
        else:
            dic[v] += 1
    for v in dic.items():
      if v[1] < 2:
        result.append(v[0])
    return result


def union(a, b):
    result = []
    dic = {}
    for v in a:
        if v not in dic:
            dic[v] = 1
        else:
            dic[v] += 1
    for v in b:
        if v not in dic:
            dic[v] = 1
        else:
            dic[v] += 1
    for v in dic.items():
        result.append(v[0])
    return result

print(inter([1, 2, 3], [1, 3, 5]))  # 1,3
print(rel([1, 2, 3], [1, 3, 5]))  # 2,5
print(union([1, 2, 3], [1, 3, 5]))  # 1,2,3,5
