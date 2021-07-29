#  실패율 
#  스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
def solution(N, stages):
    # N개의 스테이지가 있는데 각 스테이지당 실패율 구해서 내림차로 반환
    answer = []
    cur_stage = {}
    for i in range(1, N + 1):
        if i not in cur_stage:
            cur_stage[i] = 0
    players = len(stages)
    for cur in range(1, N + 1):
        fail_players = 0
        for stage in stages:
            if stage == cur:
                fail_players += 1
        if players != 0:
            cur_stage[cur] = fail_players / players
        players -= fail_players
    cur_stage = sorted(cur_stage.items(), key=lambda x: x[1], reverse=True)
    for i in cur_stage:
        answer.append(i[0])
    return answer