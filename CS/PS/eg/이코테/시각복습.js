const h = "5";

let hour = +h;
let count = 0; 
for(let i = 0; i <= hour; i++){
  for(let m = 0; m < 60; m++){
    for(let s = 0; s < 60; s++){
      let time ="";
      time = time.concat(i.toString() + m.toString() + s.toString());

      if (time.includes('3'))
        count++;
    }
  }
}
console.log(count);
