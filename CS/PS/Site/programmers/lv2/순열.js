const getPermutaition = (arr, selectedNumber) => {
  const result = [];
  if (selectedNumber === 1) {
    return arr.map((item) => [item]);
  }
  arr.forEach((fixed, index, origin) => {
    const rest = origin.filter((_, idx) => index !== idx);
    const per = getPermutaition(rest, selectedNumber - 1);
    const attachment = per.map((item) => [fixed, ...item]);
    result.push(...attachment);
  });
  return result;
};

console.log(getPermutaition([1, 2, 3, 4, 5], 3));
