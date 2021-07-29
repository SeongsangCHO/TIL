def cal_val(num1, num2, oper):
    num1, num2 = int(num1), int(num2)
    if oper == '-':
        return num1 - num2
    if oper == '+':
        return num1 + num2
    if oper == '*':
        return num1 * num2

import itertools
def solution(expression):
    answer = 0
    combis = list(itertools.permutations(['*','-','+'], 3))
    s = ""
    nums = []
    operators = []
    for c in expression:
        if c.isnumeric():
            s += c
        else:
            nums.append(s)
            operators.append(c)
            s = ""
    if s != "":
        nums.append(s)
    for combi in combis:
        nums_copy = nums[:]
        op_copy = operators[:]
        for oper in combi:
            while oper in op_copy:
                op_idx = int(op_copy.index(oper))
                nums_copy[op_idx] = cal_val(nums_copy[op_idx], nums_copy[op_idx + 1], oper)
                nums_copy.pop(op_idx + 1)
                op_copy.pop(op_idx)
        if answer <= abs(int(nums_copy[0])):
            answer = abs(int(nums_copy[0]))
    
    return answer