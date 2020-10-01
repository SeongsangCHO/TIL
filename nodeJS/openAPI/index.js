const express = require("express");
const request = require("request");

const app = express();
const port = 5000;

const NAVER_CLIENT_ID = "knT7TXq4XSYo3llN7J8T";
const NAVER_CLIENT_SECRET = "nQfpDamLKX";
//knT7TXq4XSYo3llN7J8T
//nQfpDamLKX
const option = {
  query: "물 2L 12개", // 검색 텍스트
  start: 1, //검색 시작 위치
  display: 3, //가져올  갯수
  sort: "sim", //정렬 유형 (sim:유사도) ->광고뺴고 랭킹순으로 가져온다.
  //하루에 25000건이가능하니까 충분할듯.
  //링크 중복검사로 중복되는 데이터를 먼저 검증하고 API호출하도록 하면 될듯?

};

app.get("/", (req, res, next) => {
  request.get(
    {
      uri: "https://openapi.naver.com/v1/search/shop.json", //xml 요청 주소는 https://openapi.naver.com/v1/search/image.xml
      qs: option,
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    },
    function (err, res, body) {
      let json = JSON.parse(body); //json으로 파싱
      console.log(json);
    }
  );
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
