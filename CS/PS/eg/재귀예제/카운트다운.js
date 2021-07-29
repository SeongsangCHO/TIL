function countDown(number){
  console.log(number);
  if (number == 0)
    return ;
    
  return countDown(number - 1);
}

console.log(countDown(10));
