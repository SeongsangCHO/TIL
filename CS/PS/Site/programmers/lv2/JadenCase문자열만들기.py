def solution(s):
    s = s.lower()
    answer = ''
    split_lst = s.split(' ')
    print(split_lst)
    for i in split_lst:
        if i and i[0].isalpha() == True:
            answer += i[0].upper()
        if i and i[0].isnumeric():
            answer += i[0]
        for idx in range(1, len(i)):
            if i == '':
                answer += ' '
            else:
                answer += i[idx]

        answer += ' '
    answer = answer[:-1]
    return answer