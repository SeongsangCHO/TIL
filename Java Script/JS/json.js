let o = {};

let a ={
  b:42,
  c:o,
  d: function(){}
};

o.e = a;

// JSON.stringify(a);

a.toJSON = function(){
  return {b : this.b};
};

// console.log(JSON.stringify(a));


let AA = {
  b: 42,
  c :"42",
  d :[1,2,3]
};

console.log(JSON.stringify(AA, ["b","c"]));

console.log(JSON.stringify(AA, function(key, value) {
  if (key !== "c") return value;
}));


console.log(JSON.stringify(AA, ["b","c"],"-"));
