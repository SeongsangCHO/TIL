class Solution(object):
    def dailyTemperatures(self, temperatures):
        """
        :type temperatures: List[int]
        :rtype: List[int]
        """
        stk = []
        answer = [0] * len(temperatures)
        for idx in range(len(temperatures)):
            while(stk and temperatures[stk[-1]] < temperatures[idx]):
                answer[stk[-1]] = idx - stk[-1]
                stk.pop()
            stk.append(idx)
        return answer
    dailyTemperatures("", [73, 74, 75, 71, 69, 72, 76, 73])
