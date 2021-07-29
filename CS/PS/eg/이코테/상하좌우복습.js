const n = 5;
const MOVE_PLAN= "R R R U D D";
const MOVE_TYPE = ['R', 'L', 'U', 'D'];
let [x, y] = [1, 1];

let nX;
let nY;

//동서남북
let dirX = [0, 0, -1, 1]
let dirY = [1, -1 , 0, 0];

let plans = MOVE_PLAN.split(' ');
for (let plan of plans){
  for(let i = 0; i < 4; i++){
    if (plan === MOVE_TYPE[i]){
      nX = x + dirX[i];
      nY = y + dirY[i];
    }
  }
  if ((nX >= 1 && nX <= 100) && (nY >= 1 && nY <= 100)){
    x = nX;
    y = nY;
  }
}
console.log(x, y);
