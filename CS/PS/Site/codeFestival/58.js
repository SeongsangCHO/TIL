const solution = (s) => {
  if (s.length <= 3){
    return s;
  } else {
    return solution(s.slice(0, s.length - 3)) + "," + s.slice(s.length - 3);
  }
}

console.log(solution('123456789'));
