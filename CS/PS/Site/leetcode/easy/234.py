# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
from typing import List

class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
      valueList = []
      while(head):
        valueList.append(head.val)
        head = head.next
      revList = valueList[::-1]
      return revList == valueList