const a = 'aaaabbcddeeeffffa';
let count = 0;
let store = a[0];
let result = '';
a.split('').forEach((value ,index) => {
  if (value == store){
    count++;
  } else {
    result += store + count;
    store = value;
    count = 1;
  }
});
result += store + count;
console.log(result);
