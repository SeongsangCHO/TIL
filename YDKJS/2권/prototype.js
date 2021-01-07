let orgObj = {
}

Object.defineProperty(orgObj, "foo",{
  value:'orgObj',
  writable:true
})

let newObj = Object.create(orgObj);

newObj.foo = 'newObj'
console.log(orgObj.foo);
console.log(newObj.foo);



function Foo(){

}

Foo.prototype.myName = function(name){
  console.log(this.name);  
};

let a1 = new Foo();
console.log(a1.constructor === Foo);
console.log(a1.constructor === Object);
