def solution(n, arr1, arr2):
    answer = []
    std_len = len(bin(2 ** len(arr1) - 1)[2:])
    map = []
    for idx,a in enumerate(arr1):
        binary = bin(a)[2:]
        b_binary = bin(arr2[idx])[2:]
        if len(binary) < std_len:
            binary = '0' * (std_len - len(binary)) + binary
        if len(b_binary) < std_len:
            b_binary = '0' * (std_len - len(b_binary)) + b_binary
        arr1[idx] = binary
        arr2[idx] = b_binary
        map_row = ''
        for i in range(len(arr1)):
            if arr1[idx][i] == '1' or arr2[idx][i] == '1':
                map_row += '#'
            elif arr1[idx][i] == arr2[idx][i] == '0':
                map_row += ' '
        map.append(map_row)
        
    print(map)
            
    return map 