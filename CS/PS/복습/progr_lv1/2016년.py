def solution(a, b):
    answer = ''
    days = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"]
    m_day = [0,31,29,31,30,31,30,31,31,30,31,30,31]
    total_days = b
    for mon in range(0,a):
        total_days += m_day[mon]
    return days[total_days % 7 - 1]