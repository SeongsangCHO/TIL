const h = "5";

//0 to h
let mm = new Array(60).fill('').map((value, idx)=>{
  return idx;
});
let ss = new Array(60).fill('').map((value, idx)=>{
  return idx;
});

let time;
let count = 0;
for (let i = 0; i <= +5; i++){
  for(let m of mm){
    for(let s of ss){
      time = "";
      time = time.concat(i,m,s);
      if (time.includes('3'))
      count++;
    }    
  }
}
console.log(count);
