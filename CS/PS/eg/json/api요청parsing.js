const TODO_URL = `https://jsonplaceholder.typicode.com/todos`;
const USER_URL = `https://jsonplaceholder.typicode.com/users`;

function fetchApi() {
  return new Promise((resolve, reject) => {
    resolve(1);
  });
}

console.log(fetchApi().then((v) => v));

//userId에 해당하는 글 파싱하기

//id가 1~50인 것만 가져오기

//completed가 true인 것만 가져오기

// 10명의 유저의 id, 이름, 위치를 갖는 obj생성하기
