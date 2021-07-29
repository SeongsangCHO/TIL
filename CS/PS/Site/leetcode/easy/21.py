class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
      newNode = ListNode(0)
      if(not (l1 and l2)): return newNode
      while(l1 != None and l2 != None):
        if(l1.val > l2.val):
          newNode.next = l2
          l2 = l2.next
        else:
          newNode.next = l1
          l1 = l1.next
      while(l1):
        newNode.next = l1
        l1 = l1.next
      while(l2):
        newNode.next = l2
        l1 = l2.next
      return newNode

