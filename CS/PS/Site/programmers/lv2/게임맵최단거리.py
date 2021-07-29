from collections import deque
def solution(maps):
		answer = -1
		posX = [-1, 1, 0, 0]
		posY = [0, 0, -1, 1]
		queue = deque([[0, 0, 0]])
		n, m = len(maps), len(maps[0])
		# maps[0][0] = 2
		while queue :
			row, col, cost = queue.popleft()
			if maps[row][col] == 2 :
				continue
			maps[row][col] = 2
			if(row == n - 1 and col == m - 1) :
				return cost + 1
			for i in range(4) :
				movX = row + posX[i]
				movY = col + posY[i]
				if movX >= 0 and movX <= n - 1 and	movY >= 0 and		movY <= m - 1 and		maps[movX][movY] == 1 :
					queue.append([movX, movY, cost + 1])
		return answer