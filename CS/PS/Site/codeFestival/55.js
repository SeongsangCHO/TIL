/*하노이탑

모든 원반은 A
모드 원반 지름 다름
3개의 기둥중 하나에 반드시 꽂혀야함
자신보다 작은 원반 위 큰 원판 놓을 수 없ㅇ,ㅁ
한번에 하나의 원판만 옮김


2 ** n - 1 번만큼 순회
O(2^n)만큼 시간
*/



let path = [];
const hanoi = (n, start, target, via) => {
  if (n == 1) { 
  path.push([start, target]);
  return ;}

  hanoi(n - 1, start, via, target);
  path.push([start, target]);
  hanoi(n - 1, via, target, start);

}
//n == 원반수
hanoi(3, "A","C","B");
console.log(path);


