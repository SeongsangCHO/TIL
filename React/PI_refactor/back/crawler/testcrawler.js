const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
let db = require("../config/db_config");

//품목기반으로 검색한 크롤링을 해야하는데,
//크롤링에 인자전달하는 방법
//db에서 select한 결과를 갖고 크롤링을 해야할듯
const crawler = async () => {
  const browser = await puppeteer.launch({ headless: false });
  await browser.userAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  );
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    "accept-charset": "euc-kr", //한글 깨지는 문제를 해결해보려고 charset을 바꿔봤는데 해결안됨
  });

  let name = {
    user: [{}],
  };
  try {
    let sql = `select * from testAPI`;

    db.query(sql, (error, result) => {
      if (error) console.error(error);
      // console.log(result);
      const move = async (result) => {
        await page.goto(`https://google.com?${result[0].user_id}`);
      };
      move(result);
    });
  } catch (error) {
    if (error) console.error(error);
  }
  console.log(name);
};

module.exports = crawler;
