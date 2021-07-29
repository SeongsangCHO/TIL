/**
 * @param {string} digits
 * @return {string[]}
 */

var letterCombinations = function (digits) {
  if (digits == "")
    return []
  const dictionary = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  let result = []
  function dfs(i, str) {
    if (i === digits.length) {
      result.push(str);
      return;
    }
    for (let v of dictionary[digits[i]]) {
      dfs(i + 1, str + v);
    }
  }
  dfs(0, "");
  return result;
};

console.log(letterCombinations("23"));
