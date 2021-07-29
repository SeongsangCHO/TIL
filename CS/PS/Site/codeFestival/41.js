function isPrime(number){
  let value = Math.sqrt(number);
  let count = 0;
  if (number == 1 || number % 2 == 0)
    return "not prime";
  for(let i = 2; i <= value; i++){
    if (number % value === 0)
      count++;
    if (count >= 2)
      return "not prime";
  }
  return "prime";
}

let result = isPrime(1);
console.log(result);

