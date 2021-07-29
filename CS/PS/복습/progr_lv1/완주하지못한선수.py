# 16:51 ~ 16:55
import collections
def solution(participant, completion):
    answer = ''
    player = collections.defaultdict()
    for parti in participant:
        if parti not in player:
            player[parti] = 1
        else:
            player[parti] += 1
    for com in completion:
        if com in player:
            player[com] -= 1
    for done in player:
        if player[done] == 1:
            answer = done
    return answer