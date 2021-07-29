from typing import List


class Solution:

    def numIslands(self, grid: List[List[str]]) -> int:
        posX = [-1, 1, 0, 0]
        posY = [0, 0, -1, 1]
        m, n = len(grid), len(grid[0])

        def dfs(grid, x, y):
            for idx in range(4):
                movX = posX[idx] + x
                movY = posY[idx] + y
                if((movX >= 0 and movX < m) and (movY >= 0 and movY < n)):
                    if grid[movX][movY] == '0':
                        continue
                    else:
                        grid[movX][movY] = '0'
                        dfs(grid, movX, movY)
        answer = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == "1":

                    dfs(grid, i, j)
                    answer += 1
        return answer
    print(numIslands("",  [
        ["1", "1", "1", "1", "0"],
        ["1", "0", "0", "1", "0"],
        ["0", "0", "0", "0", "0"],
        ["1", "0", "1", "0", "1"]
    ]))
