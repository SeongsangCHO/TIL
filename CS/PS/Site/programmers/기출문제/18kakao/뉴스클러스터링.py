# import collections
# def make_collection(str_):
#     result = {}
#     for c in range(0, len(str_) - 1):
#         if str_[c].isalpha() and str_[c + 1].isalpha() and str_[c]+str_[c+1] not in result:
#             result[str_[c]+str_[c + 1]] = 0
#         if str_[c] + str_[c+1] in result:
#             result[str_[c]+str_[c+1]] += 1
#     return result
# def solution(str1, str2):
#     answer = 0
#     a = ""
#     b = ""
#     cl_a = make_collection(str1.lower())
#     cl_b = make_collection(str2.lower())
#     if not cl_a and not cl_b:
#         return 65536
#     child = 0
#     parent = 0
#     for a in cl_a:
#         if a in cl_b:
#             child += min(cl_a[a], cl_b[a])
#             cl_b[a] = max(cl_a[a], cl_b[a])
#         else :
#             cl_b[a] = cl_a[a]
#     for b in cl_b:
#         parent += cl_b[b]
            
#     print(child, parent)
#     if child ==0 and parent == 0:
#         return 65536
#     return int((child/parent) * 65536)


# retry

def solution(str1, str2):
    answer = 0
    str1 = str1.lower()
    str2 = str2.lower()
    
    a_lst = [str1[i] + str1[i + 1] for i in range(0, len(str1) - 1) if str1[i:i+2].isalpha()]
    b_lst = [str2[i] + str2[i + 1] for i in range(0, len(str2) - 1) if str2[i:i+2].isalpha()]
    if len(a_lst) == 0 and len(b_lst) == 0:
        return 65536
    intersect_lst = []
    union_lst = []
    for a in a_lst:
        if a in b_lst:
            b_lst.remove(a)
            intersect_lst.append(a)
    union_lst = a_lst + b_lst
    if len(intersect_lst) == 0 and len(union_lst) == 0:
        return 65536
    
    print(intersect_lst, a_lst, b_lst)
    return int(len(intersect_lst) / len(union_lst) * 65536)