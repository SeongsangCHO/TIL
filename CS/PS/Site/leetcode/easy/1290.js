/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */

// var getDecimalValue = function(head) {
//   let val = 0;
//   while(head){
//       val = (val << 1) | head.val;
//       head = head.next;
//   }
// return val;
// };

var getDecimalValue = function(head) {
  let array = [];
  let answer = 0;
  
  while (head) { 
    array.push(head.val);
    head = head.next;
  }
  array = array.map((v, idx) => {
    answer += 2 ** (array.length - 1 - idx) * v;
  });

  
  return answer;
};

console.log(getDecimalValue());
