#18:39 ~ 18:54
def solution(board, moves):
    answer = 0
    size = len(board)
    stk = []
    for move in moves:
        # 열 is move
        for x in range(0,size):
            print(board[x][move- 1], move)
            if board[x][move- 1] == 0:
                continue
            else :
                if stk and stk[-1] == board[x][move-1]:
                    answer += 2
                    stk.pop()
                    board[x][move-1] = 0
                else:
                    stk.append(board[x][move-1])
                    board[x][move-1] = 0
                break
                    
    return answer