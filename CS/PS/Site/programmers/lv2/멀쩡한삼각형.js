function getGcd(a, b) {
  const mod = a % b;
  if (mod == 0) return b;
  return getGcd(b, mod);
}

function solution(w, h) {
  const gcd = getGcd(w,h);
  return w * h - (w+h - gcd);
}

console.log(solution(8, 12));
