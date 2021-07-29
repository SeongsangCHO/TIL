import math

def solution(n, words):
    answer = [0, 0]
    word_dic = {words[0] : 0}
    
    for i in range(1, len(words)):
        curr_last_char = words[i][0] # 현재, 맨 앞 글자
        before_last_char = words[i - 1][-1] #이전 마지막 글자
        if (words[i] not in word_dic):
            word_dic[words[i]] = i
        else :
            #재등장 단어일 때 탈락
            answer = [1 + (i % n), math.ceil((i + 1) / n)]
            break
        if (curr_last_char != before_last_char):
            #이전 마지막과 현재 앞글자가 다르면
            answer = [1 + (i % n), math.ceil((i + 1) / n)]
            break
        

    return answer