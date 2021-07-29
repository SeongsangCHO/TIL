let objArr = [
  { id: 5, score: 100 },
  { id: 4, score: 120 },
  { id: 3, score: 60 },
  { id: 1, score: 120 },
  { id: 2, score: 10 },
];
const json = '{"result":true, "count":42}';

function solution(objArr) {
  let sorted = objArr.sort((a, b) => a.id - b.id); //id순 정렬
  let scorePrior = objArr.sort((a, b) => {
    if (a.score === b.score) {
      //score는 같을 때 id 오름차순
      return a.id - b.id;
    }
    return b.score - a.score; // score다를 때 점수 내림차순
  });
  console.log(sorted);
  console.log(scorePrior);
}

function parser(json) {
  const { result, count } = JSON.parse(json);
  console.log(JSON.parse('[1,2,3,4,5]')); // 배열도 가능하다.
  
  console.log(JSON.parse(json), result, count); // 문자열인 json을 객체로 parse

  let jsonObj = { id: 42, name: "se" };
  console.log(JSON.stringify(jsonObj)); // obj형식을 string으로 변환

}
// console.log(solution(objArr));
console.log(parser(json));
