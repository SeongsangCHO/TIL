const getCombis = (arr, selectedNumber) => {
  const result = [];
  if (selectedNumber === 1) {
    return arr.map((item) => [item]);
  }
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combis = getCombis(rest, selectedNumber - 1);
    const attachment = combis.map((combi) => [fixed, ...combi]);
    result.push(...attachment);
  });

  return result;
};

console.log(getCombis([1, 2, 3, 4, 5, 6], 3));
