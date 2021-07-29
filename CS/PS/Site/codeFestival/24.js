const name = "aBcDeFg";
// string to char = charCodeAt(index)

let array = "";
console.log(name.charCodeAt(0));

name.split('').map((value, idx) => {
  let res = value.charCodeAt(0);
  console.log(String.fromCharCode(res));
  
})
console.log(array);

