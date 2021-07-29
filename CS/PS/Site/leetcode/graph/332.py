from typing import List


class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        dic = {}
        for v in tickets:
            if v[0] not in dic:
                dic[v[0]] = []
                dic[v[0]].append(v[1])
            else:
                dic[v[0]].append(v[1])
        # 목적지 sort
        for v in dic.items():
            dic[v[0]].sort()
        result = ["JFK"]

        def dfs(tmp, from_add):
            if from_add not in dic:
                return
                # 최종도착지인지 판별
            if len(result) == len(tickets) + 1:
                result.append(tmp[:])
                return
            for v in dic[from_add]:
                tmp.append(v)
                dfs(tmp, v)
                dic[from_add].remove(v)
        print(dic)
        dfs(["JFK"], "JFK")
        return result
    print(findItinerary("", [["MUC", "LHR"], [
          "JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]))
    print(findItinerary("", [["JFK", "SFO"], ["JFK", "ATL"], [
          "SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]]))
    print(findItinerary("", [["JFK", "KUL"], ["JFK", "NRT"], ["NRT", "JFK"]]))
