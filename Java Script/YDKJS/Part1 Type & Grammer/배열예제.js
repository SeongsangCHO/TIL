function foo() {
  //함수객체의 arguments 프로퍼티는 {0: 값, 1: 값...} 으로 이루어져있는 객체  
  let arr = Array.prototype.slice.call(arguments);
  //call은 인수 "목록"을 받는데 
  arr.push("bam");
  console.log(arr);
}

foo("bar", "bar"); //[bar, bar, bam]