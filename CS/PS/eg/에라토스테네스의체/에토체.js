const get_prime = (num) => {
  let prime_list = Array(num).fill(true);
  let last = Math.floor(Math.sqrt(num));

  for(let i = 2; i < (last + 1); i++){
      if (prime_list[i]){
        for(let j = i + i; j < num; j += i){
          console.log(j);
          prime_list[j] = false;
        }
    }
  }
  return prime_list.slice(2);
  
}

console.log(get_prime(12));
