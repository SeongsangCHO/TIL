from typing import List

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next


class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        prev = head
        if(head.next):
            next = head.next
        while(prev):
            prev.next = next.next
            next.next = prev
            next = prev.next
            prev = next.next
        return head
