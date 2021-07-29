a = int(input())
memo = [0] * 46


def fibo(n):
    if n <= 2:
        return 1
    if memo[n] != 0:
        return memo[n]
    else:
        memo[n] = fibo(n - 1) + fibo(n - 2)
    return memo[n]


def solution(a):
    answer = fibo(a)
    print(answer)


solution(a)
# print(fibo(0))
# print(fibo(1))
# print(fibo(2))
# print(fibo(3))
# print(fibo(4))
# print(fibo(5))
# print(fibo(6))
# print(fibo(7))
# print(fibo(8))
# print(fibo(9))
