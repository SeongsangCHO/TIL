const pos ="c2";

let splited = pos.split('');
let count = 0;
let x = splited[0].charCodeAt(0) - 97 + 1;
let y = +splited[1];
let nX;
let nY;
let steps = [[-2, -1], [-2, 1], [-1, 2], [1, 2],
            [2, -1], [2, 1], [-1, -2], [1, -2]];

//현재 좌표
console.log(x, y);


for (let step of steps){
  nX = x + step[0];
  nY = y + step[1];

  if ((nX >= 1 && nX <= 8) && (nY >= 1 && nY <= 8))
    count++;
}
console.log(count);


