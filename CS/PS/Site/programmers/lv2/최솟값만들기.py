def solution(A,B):
    answer = 0

    # [실행] 버튼을 누르면 출력 값을 볼 수 있습니다.
    # A 오름차 정렬
    # B 내림차정렬
    # A, B 앞에서부터 뽑아서 더한게 최소
    A.sort()
    B.sort(reverse=True)
    for i in range(len(A)):
        answer += A[i] * B[i]
    return answer