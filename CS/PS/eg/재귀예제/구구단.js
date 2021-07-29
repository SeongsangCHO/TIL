function multiTable(n,number){
  if (number == 0)
    return 0;
    
    multiTable(n,number - 1)
    console.log(n * number);
  return;
}

console.log(multiTable(2,10));
