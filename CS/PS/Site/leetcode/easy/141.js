/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (head == null)
    return false;
  head.val = 'a';
  while (head && head.next) { 
    head = head.next;
    if (head.val != null && head.val == 'a')
      return true;
    else
      head.val = 'a';
  }
  return false;
};