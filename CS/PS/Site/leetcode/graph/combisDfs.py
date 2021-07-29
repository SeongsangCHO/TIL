def combis(nums):
  result = []
  def dfs(element, start, k):
    if k == 0:
      result.append(element[:])
      return 
    for idx in range(start, len(nums)):
      element.append(nums[idx])
      dfs(element, idx + 1, k - 1)
      element.pop()
  dfs([], 0, 2)
  return result
print(combis([1,2,3,4,5,6]))
