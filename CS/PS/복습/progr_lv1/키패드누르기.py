# 16:56 ~ 17:10
def solution(numbers, hand):
    answer = ''
    # 4 by 3
    pad = {
        1 : [0,0],
        2 : [0,1],
        3 : [0,2],
        4 : [1,0],
        5 : [1,1],
        6 : [1,2],
        7 : [2,0],
        8 : [2,1],
        9 : [2,2],
        '*' : [3,0],
        0 : [3,1],
        '#' : [3,2]
        
    }
    left_pos = pad['*']
    right_pos = pad['#']
    for num in numbers:
        if (num == 1 or num == 4 or num == 7):
            answer += "L"
            left_pos = pad[num]
        elif (num  == 3 or num == 6 or num == 9):
            answer += "R"
            right_pos = pad[num]
        elif (num  == 2 or num == 5 or num == 8 or num == 0):
            # 이동거리 = > | key_pos_x - hand_pos_x | + |y거리| -> 같을 때 손잡이방향 우선
            mov_left_x = abs(pad[num][0] - left_pos[0])
            mov_left_y = abs(pad[num][1] - left_pos[1])
            mov_right_x = abs(pad[num][0] - right_pos[0])
            mov_right_y = abs(pad[num][1] - right_pos[1])
            
            if (mov_left_x + mov_left_y > mov_right_x + mov_right_y) : # left가 더 멀때
                answer += "R"
                right_pos = pad[num]
            elif mov_left_x + mov_left_y < mov_right_x + mov_right_y:
                answer += "L"
                left_pos = pad[num]
            else :
                if hand == "right":
                    answer += "R"
                    right_pos = pad[num]
                else :
                    answer += "L"
                    left_pos = pad[num]
            
            
        
    return answer