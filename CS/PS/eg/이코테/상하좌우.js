const n = 5;
const MOVE_PLAN= "R R R U D D";
let map = new Array(n + 2).fill('').map((value, idx)=>{
  let char = '';
  if (idx == 0 || idx == n + 1)
    char = 'X';
  return value = new Array(n + 2).fill(char);
});
for(let i = 0; i < n + 2; i++){
  map[i][0] = 'X';
  map[i][n + 1] = 'X';
}

let x = 1;
let y = 1;
//동 북 서 남
const dirX = [0, -1, 0, 1];
const dirY = [1, 0, -1, 0];
const MOVE_TYPE = ['R', 'U', 'L' ,'D'];
//인덱스로 사용하기
let moveArray = MOVE_PLAN.split(' ');
console.log(moveArray);
//맵의 크기를 넘어가는 상황은
// 테두리에 X를 넣으면 되겠네.
for(let direction of moveArray){
  let nX = 0;
  let nY = 0;
   for (let i = 0; i < 4; i++){
     if (direction === MOVE_TYPE[i]){
       nX = x + dirX[i];
       nY = y + dirY[i];
     }
   }
   if (map[nX][nY] != 'X'){
     x = nX;
     y = nY;
   }
}
console.log(x);
console.log(y);
