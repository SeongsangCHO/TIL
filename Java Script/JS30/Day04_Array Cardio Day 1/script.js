const inventors = [
  { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
  { first: "Max", last: "Planck", year: 1858, passed: 1947 },
  { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
  { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
  { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
  { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
  { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 },
];

const people = [
  "Beck, Glenn",
  "Becker, Carl",
  "Beckett, Samuel",
  "Beddoes, Mick",
  "Beecher, Henry",
  "Beethoven, Ludwig",
  "Begin, Menachem",
  "Belloc, Hilaire",
  "Bellow, Saul",
  "Benchley, Robert",
  "Benenson, Peter",
  "Ben-Gurion, David",
  "Benjamin, Walter",
  "Benn, Tony",
  "Bennington, Chester",
  "Benson, Leana",
  "Bent, Silas",
  "Bentsen, Lloyd",
  "Berger, Ric",
  "Bergman, Ingmar",
  "Berio, Luciano",
  "Berle, Milton",
  "Berlin, Irving",
  "Berne, Eric",
  "Bernhard, Sandra",
  "Berra, Yogi",
  "Berry, Halle",
  "Berry, Wendell",
  "Bethea, Erin",
  "Bevan, Aneurin",
  "Bevel, Ken",
  "Biden, Joseph",
  "Bierce, Ambrose",
  "Biko, Steve",
  "Billings, Josh",
  "Biondo, Frank",
  "Birrell, Augustine",
  "Black, Elk",
  "Blair, Robert",
  "Blair, Tony",
  "Blake, William",
];

const data = [
  "car",
  "car",
  "truck",
  "truck",
  "bike",
  "walk",
  "car",
  "van",
  "bike",
  "walk",
  "car",
  "van",
  "car",
  "truck",
];

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


