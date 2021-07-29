function solution(size, ins) {
  let insArr = ins.split(" ");
  let posX = 1;
  let posY = 1;
  for(let i = 0 ; i < insArr.length; i++){
    if(insArr[i] === "U" && posX > 1){
      posX--;
    }
    if(insArr[i] === "D" && posX < size){
      posX++;
    }
    if(insArr[i] === "R" && posY < size){
      posY++;
    }
    if(insArr[i] === "L" && posY > 1){
      posY--;
    }
  }
  console.log(posX, posY);
}

console.log(solution(5, "R R R U D D"));
