from typing import List 

def permute(self, nums: List[int]) -> List[List[int]]:
  results = []
  prev_elements = []
  def dfs(elements):
    if len(elements) == 0:
      results.append(prev_elements[:])
      print('res: ', results)
      
    for e in elements:
      next_elements = elements[:]
      print('next ', next_elements, e)
      
      next_elements.remove(e)
      prev_elements.append(e)
      dfs(next_elements)
      
      print('pop ', prev_elements.pop(), prev_elements)
  dfs(nums)
  return results
print(permute("",[1,2,3]))
