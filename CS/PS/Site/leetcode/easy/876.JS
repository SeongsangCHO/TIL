/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode_ = function (head) {
  let curr = head;
  let size = 0;
  let index;
  while (head) { 
    head = head.next;
    size++;
  }
  index = size % 2 ? Math.floor(size / 2)  : size / 2 ;
  
  for (let i = 0; i < index; i++) { 
    curr = curr.next;
  }

  return curr;
};


var middleNode = function (head) { 
  let fast = head;
  let slow = head;

  while (fast && fast.next) { 
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
}
console.log(middleNode());
