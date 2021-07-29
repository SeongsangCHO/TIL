import collections
def solution(cacheSize, cities):
    if cacheSize == 0:
        return 5 * len(cities)
    cities = [city.lower() for city in cities]
    answer = 0
    que = []
    for city in cities:
        #  큐에 여유가 있고 해당 도시가 없을 때 => 큐에 추가
        if city not in que and len(que) < cacheSize: 
            answer += 5
            que.append(city)
        # 캐시가 여유 또는 꽉 찼을 때 캐시 적중했을 때 맨 뒤로 밀기
        elif len(que) <= cacheSize and city in que:
            answer += 1
            tmp = que.pop(que.index(city))
            que.append(tmp) #제일 뒤로 이동,
        # 캐시여유없고 해당도시가 없을 때
        elif city not in que and len(que) == cacheSize:
            answer += 5
            que.pop(0)
            que.append(city)
            
    return answer