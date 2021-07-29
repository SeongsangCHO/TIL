let memo = new Array(100).fill('');

const fibo = (n) => {
  if (n <= 2)
    return 1;
  if (memo[n] != 0)
    return memo[n];
  else
    memo[n] = BigInt(fibo(n - 1)) + BigInt(fibo(n - 2));
  console.log(memo[n]);

  return memo[n];
}

console.log(fibo(99));

if (fibo(99) == 218922995834555169026n)
  console.log('is true');
  

  