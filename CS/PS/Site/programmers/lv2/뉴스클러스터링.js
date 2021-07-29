function stringToLowerCase(str) {
  return str.toLowerCase();
}

function sliceString(str) {
  let len = str.length;
  let result = new Map();
  for (let i = 1; i < len; i++) {
    if (
      str[i - 1] >= "a" &&
      str[i - 1] <= "z" &&
      str[i] >= "a" &&
      str[i] <= "z"
    ) {
      if (!result.has(str[i - 1] + str[i])) {
        result.set(str[i - 1] + str[i], 1);
      } else {
        result.set(str[i - 1] + str[i], result.get(str[i - 1] + str[i]) + 1);
      }
    }
  }
  return result;
}

//교집합 구하기 m2반복시켰을 때, m1이 m2 키가 있다면, 둘 중 작은거 추가하기, 없다면 아무일도 없음.
function getIntersection(m1, m2) {
  let interNumber = 0;
  for (let key of m2) {
    if (m1.has(key[0])) {
      interNumber += Math.min(m1.get(key[0]), key[1]);
    }
  }
  return interNumber;
}
// 둘 중 사이즈 큰 것 중, 디폴트 0 (m2라고 할 때) m2가 m1의 키가 없다면 추가시키기, 있다면 둘 중 max값 더하기
function getUnion(m1, m2) {
  let unionNumber = 0;
  if (m2.size <= m1.size) {
    for (let key of m2) {
      unionNumber += key[1];
    }
    for (let key of m1) {
      if (m2.has(key[0])) {
        unionNumber -= m2.get(key[0]);
        unionNumber += Math.max(m2.get(key[0]), key[1]);
      } else {
        unionNumber += key[1];
      }
    }
  } else if (m1.size <= m2.size) {
    for (let key of m1) {
      unionNumber += key[1];
    }
    for (let key of m2) {
      if (m1.has(key[0])) {
        unionNumber -= m1.get(key[0]);
        unionNumber += Math.max(m1.get(key[0]), key[1]);
      } else {
        unionNumber += key[1];
      }
    }
  }
  return unionNumber;
}

function solution(str1, str2) {
  var answer = 0;

  if (str1.length === 0 && str2.length === 0) return 1; //둘 다 공집합
  if (str1.length === 0 || str2.length === 0) return 0; //둘중하나 공집합  0 / 합집합
  str1 = stringToLowerCase(str1);
  str2 = stringToLowerCase(str2);
  let map1 = sliceString(str1);
  let map2 = sliceString(str2);
  if (map1.size === 0 && map2.size === 0) return 1 * 65536; //둘 다 공집합
  if (map1.size === 0 || map2.size === 0) return 0;
  //둘중하나 공집합  0 / 합집합
  let mole = getIntersection(map1, map2);
  let deno = getUnion(map1, map2);

  answer = Math.floor((mole / deno) * 65536);
  return answer;
}

console.log(solution("FRANCE", "french"));
console.log(solution("handshake", "shake hands"));
console.log(solution("aa1+aa2", "AAAA12"));
console.log(solution("E=M*C^2", "e=m*c^2"));
