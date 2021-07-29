def get_primes(num):
  prime_list = [True] * num
  last = int(num ** 0.5)
  for i in range(2, last + 1):
    if prime_list[i]:
      for j in range (i*2, num, i):
        prime_list[j] = False

  return [i for i in range(2,num) if prime_list[i] == True]