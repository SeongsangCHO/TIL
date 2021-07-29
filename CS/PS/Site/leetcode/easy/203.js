/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  if (head == null) return null;
  let curr = head;
  while (head && head.next) {
    if (head.next.val == val) {
      head.next = head.next.next;
    }
    head = head.next;
  }
  return curr;
};
