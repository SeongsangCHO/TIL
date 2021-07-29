let map = new Array(9).fill("").map((value, idx) => {
  let char = '';
  if(idx == 0 || idx == 8)
    char = 'X'
  return (value = new Array(9).fill(char));
});
//상하좌우에 X를 넣기 위해 + 1 만큼 크기,
let mapSize = map.length;

//행 왼, 끝쪽 채우기
for(let i = 1; i < mapSize - 1; i++){
  map[i][0] = 'X';
  map[i][mapSize - 1] = 'X';
}
// 테두리 X로 차있는 8 x 8 map

const pos ="a1";
// 현재 위치
let x; 
let y;
//        동 북 서 남
let dx = [0, -1, 0, 1];
let dy = [1, 0, -1, 0];
// 현재 위치 + 방향 
let nX;
let nY;

pos.split('').map((value, idx)=>{
  
  if (idx == 0)
    y = value.charCodeAt(0) - 96;
  if (idx == 1)
    x = +value;
});
console.log(x, y);

//행, 렬 좌표 구함
let tmpX;
let tmpY;

let count = 0;

for(let i = 0; i < 4; i++){
  //동북서남 이동, 넘는지 확인
  nX = x + dx[i];
  nY = y + dy[i];
  if (map[nX][nY] == 'X')
  continue;
  else{
    //한칸 더 이동해서 상, 하, 좌, 우만 보면됨
    nX = nX + dx[i];
    nY = nY + dy[i];
  }
  
  let flag = -1;
  for(let j = 0; j < 2; j++){
    if (map[nX][nY] == 'X')
      break;
    // 상, 하 ,좌 , 우 확인
    //동일때
    if (i == 0){
      tmpX = nX + flag;
      tmpY = nY;
      console.log("동", tmpX, tmpY);
      
    }
    //북일때 
    if (i == 1){
      tmpX = nX;
      tmpY = nY + flag;
      console.log("북", tmpX, tmpY);
    }
    //서일때
    if (i == 2){
      tmpX = nX + flag;
      tmpY = nY;
      console.log("서", tmpX, tmpY);
    }
    //남일때 
    if (i == 3){
      tmpX = nX;
      tmpY = nY + flag;
      console.log("남", tmpX, tmpY);
    }
    if (map[tmpX][tmpY] != 'X'){
      map[tmpX][tmpY] = 'O';
      count++;
    }
    flag *= -1;
  }
}

console.log(count);

console.log(map);
