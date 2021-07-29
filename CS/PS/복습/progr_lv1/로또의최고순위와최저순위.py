# 17:11 ~ 17:30

# 일치하는 최저의 갯수 -> 최저순위번호
# 알아볼수 없는 것 중 내가 안썼고, 안맞춘 번호중 남은 갯수
# 1 ~ 45까지 배열 생성,  내가 쓴 것 -1로 만들기
# 당첨번호 배열 생성 (주어짐) -> 내거랑 일치하는거 -1로 set
# =
def solution(lottos, win_nums):
    zero_cnt = 0
    match_cnt = 0
    prize = {6:1, 5:2, 4:3, 3:4, 2:5, 1:6, 0:6} # 6개시 1등,, 1,0개 6등
    for my_num in lottos: # 31, 10, 45, 1, 6, 19
        if my_num == 0: # 44, 1, 0, 0, 31, 25
            zero_cnt += 1 # 0 => 2개
        if my_num in win_nums:
            match_cnt += 1 # 1, 31 => 2개 , 4개맞추면 3등
    
    answer = [prize[zero_cnt + match_cnt],prize[match_cnt]] # 최저 #최대
    
    return answer