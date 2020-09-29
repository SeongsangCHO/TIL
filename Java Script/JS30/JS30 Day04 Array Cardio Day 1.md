## JS30 Day04 Array Cardio Day 1



### 요구사항

- array 메소드에 대해 다룸

- filter, map, sort, reduce 등을 이용해 주어진 문제를 해결

  

---

<br>

### 선수지식

- array 메소드들에 대한 이해

  - prototype에 `map`메소드가 없으면 유사배열 객체나 반복가능한 객체를 얕게 복사해 새로운 Array 객체로 만들어 순회할 수 있도록 배열형태로 반환해야한다 `spread인 [...]`, `Array.from()`을 사용해주도록 하자.

- NodeList는 Array와 다름

  - NodeList는 JS API가 아닌 Browser API임.
  - `Array.isArray`메서드로 배열인지 확인할 수 있음 이는 유사배열임

  

### 문제와 코드



#### 1. Array*.*prototype*.*filter()

  \1. Filter the list of inventors for those who were born in the 1500's ~ 1599



#### 2. Array*.*prototype*.*map()

  \2. Give us an array of the inventors first and last names





#### 3. Array*.*prototype*.*sort()

  \3. Sort the inventors by birthdate, oldest to youngest



#### 4. Array*.*prototype*.*reduce()

  \4. How many years did all the inventors live all together?



#### 5. Sort the inventors by years lived



#### 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name

  https://*en.wikipedia.org/wiki/Category:Boulevards_in_Paris*



#### 7.  sort Exercise

  Sort the people alphabetically by last name



#### 8. Reduce Exercise

  Sum up the instances of each of these



```javascript

//1번 
let fifteen = inventors.filter((v, idx) => v.year >= 1500 && v.year < 1600);
console.log(fifteen);

//2번
let fullName = inventors.map((v) => `${v.first} ${v.last}`);
console.log(fullName);

//3번 birthdate로 내림차순
let sortedDesc = inventors.sort((a, b) => a.year - b.year); 
console.log(sortedDesc);

//4번
let totalYear = inventors.reduce((prev, curr) => { return prev + (curr.passed - curr.year)},0)
console.log(totalYear);

//5번 수명 순서로 sort
let sortedYear = inventors.sort((a, b) => {
  return (a.passed - a.year) - (b.passed - b.year);
});
console.log(sortedYear);


//6번

// const category = document.querySelector('.mw-category');

// const links = category.querySelectorAll('a');
// console.log(links);

// let linksTexts = Array.from(links)
//   .map((v) => v.innerHTML)
//   .filter((v) => v.includes('de'));


//7번 last네임을 알파벳순으로 정렬

let sortedAlphabet = people.sort((a, b) => {
  let [last, first] = a.split(", ");
  let [bLast, bFirst] = b.split(", ");
  return bLast - last;
});



//8번 data의 갯수 세기

let set = [...new Set(data)];
console.log(set);

let tranformation= data.reduce((obj, item) => { 
  if (!obj[item])
    obj[item] = 0;
  obj[item]++;
  return obj;
}, {});

console.log(tranformation);



```

