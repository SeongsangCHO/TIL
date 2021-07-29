def solution(arr1, arr2):
    answer = []
    for x in range(0, len(arr1)):
        lst = []
        for y in range(0, len(arr1[0])):
            lst.append(arr1[x][y]+arr2[x][y])
        answer.append(lst)
    return answer