let express = require("express");
let path = require("path");
let crawler = require("./crawler/testcrawler");
let multi = require("./crawler/multi");

const app = express();
const port = process.env.PORT || 80;

let testAPIRouter = require("./routes/testAPI");

//템플릿엔진 ejs 설정 __dirname +'views'랑 같음
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", testAPIRouter);

app.get("/", (req, res) => {
  res.send("hello World");
});

app.get("/api", (req, res) => {
  res.render("../views/index", { title: "api page" });
});

//클릭시 처리를 어떻게 해야할까
//https://stackoverflow.com/questions/55647287/how-to-send-request-on-click-react-hooks-way

//클릭데이터를 서버에 전달해야하는뎀.

//크롤러는 하나임, 데이터를 저장할 크롤러 하나 뿐
//링크박스 추가시 크롤러데이터를 저장할 부분과 클릭할 때 이를 가져올 부분을 따로 작성해야함.
//링크박스가 저장될때마다 ,요청이 발생할때마다 호출할 함수 crawler
//링크박스의 제목을 기반으로 크롤러 수행
//크롤러 데이터를 db에 저장함
//
app.get("/craw", (req, res) => {
  let status = "크롤러수행중";
  crawler();

  res.send(status);
});

app.get("/multi", (req, res) => { 
  let status = "멀티플 크롤러";
  multi();
})
app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
