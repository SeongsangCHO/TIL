#17:54 ~ 18:03
def solution(new_id):
    answer = ''
    new_id = list(new_id.lower())
    parse_str = []
    for c in new_id:
        if c.isalnum() or c == '-' or c =='_' or c=='.':
            if parse_str and parse_str[-1] == '.' and c == '.':
                continue
            parse_str.append(c)
    if parse_str and parse_str[0] == '.':
        parse_str.pop(0)
    if parse_str and parse_str[-1] == '.':
        parse_str.pop()
    if not parse_str:
        parse_str.append('a')
    if len(parse_str) >= 16:
        parse_str = parse_str[0:15]
    if parse_str and parse_str[-1] == '.':
        parse_str.pop()
    while len(parse_str) < 3:
        parse_str.append(parse_str[-1])

    
    return ''.join(parse_str)