
import itertools
N = int(input())
lst = [list(map(int, input().split())) for _ in range(N)]


def solution(N, lst):
    players = [i for i in range(1, N + 1)]
    combis = list(itertools.combinations(players, int(len(players) / 2)))
    combis_len = len(combis)
    start_team = combis[0:int(combis_len / 2)]
    link_team = combis[int(combis_len / 2):][::-1]

    start_pair = []
    link_pair = []
    answer = 40001
    for idx in range(int(combis_len / 2)):
        start_stats = 0
        link_stats = 0
        start_pair = list(itertools.combinations(
            start_team[idx], 2))  # 1,2,3중 2개 조합
        link_pair = list(itertools.combinations(
            link_team[idx], 2))  # 4,5,6중 2개 조합
        for i in range(len(start_pair)):
            s_left, s_right = start_pair[i][0], start_pair[i][1]
            l_left, l_right = link_pair[i][0], link_pair[i][1]
            start_stats += lst[s_left - 1][s_right - 1] + \
                lst[s_right - 1][s_left - 1]
            link_stats += lst[l_left - 1][l_right - 1] + \
                lst[l_right - 1][l_left - 1]
        if answer >= abs(start_stats - link_stats) >= 0:
            answer = abs(start_stats - link_stats)

    return answer


print(solution(N, lst))
