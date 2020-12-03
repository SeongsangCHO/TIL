function outer (name) {
  let localVar = '지역변수' + name;
  return function () {
    console.log("return function");
    console.log(localVar);
   }
}

outer()();
outer('secho')();

let a = function () {
  console.log('this is function');
}



if (typeof(a) === typeof(outer())){
  console.log('a , outer() type is same');
  
}

[0,1,2].forEach((value)=>{
  setTimeout(() => {
    console.log(value);
  },1000);
})