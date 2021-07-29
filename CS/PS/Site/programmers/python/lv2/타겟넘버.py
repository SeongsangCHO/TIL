
def solution(numbers, target):
    answer = 0

    def dfs(sum, idx):
        result = 0
        if sum == target and idx == len(numbers):
            return 1
        if idx == len(numbers):
            return 0
        result += int(dfs(sum + numbers[idx], idx + 1))
        result += int(dfs(sum - numbers[idx], idx + 1))
        return result
    answer = dfs(0, 0)
    return answer