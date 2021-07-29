const pos = "c2";
let x;
let y;
pos.split('').map((value, idx)=>{

  if (idx === 0){
    x = value.charCodeAt(0) - 96;
  }
  else
    y = +value;
});

let step = [[-2, -1], [-2, 1], [-1, 2], [1, 2],
        [2, 1] ,[2,- 1], [-1, -2], [1, -2]];

let next_stepX;
let next_stepY;
let count = 0;
for (let steps of step){
  next_stepX = x + steps[0];
  next_stepY = y + steps[1];

  if ((next_stepX >= 1 && next_stepX <= 8) && (next_stepY >= 1 && next_stepY <= 8))
    count++;
}
console.log(count);
