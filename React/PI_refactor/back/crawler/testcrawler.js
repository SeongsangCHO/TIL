const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
let db = require("../config/db_config");
let iconv = require("iconv-lite");

function encodeText(str) {
  let euckrObj = iconv.encode(str, "euc-kr"); //스트링을 euc-kr로 인코딩
  let result = "";
  for (const code of euckrObj) {
    result += "%" + code.toString(16); //인코딩된(euc-kr용 숫자로 바뀐) 숫자를 16진법으로 변환한 뒤 %와 결합해서 URL용 EUC-KR버전으로 바꿈
  }
  return result;
}

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
  //링크 title을 요청받아와서 사용
  let searchText = "물";

  let encodedSearchText = encodeText(searchText);
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    `http://www.ssg.com/search.ssg?target=all&query=${searchText}`,
    // http://www.ssg.com/search.ssg?target=all&query=%EB%AC%BC&sort=sale 판매량순
    { waitUntil: "networkidle0" }
  );

  const ulContentSelector = `#divProductImg > #idProductImg li`;

  const liLength = await page.evaluate((SELECTOR) => {
    //page당 아이템 갯수 출력 80개
    return document.querySelectorAll(SELECTOR).length;
  }, ulContentSelector);

  let productData = [];
  for (let idx = 1; idx <= liLength; idx++) {
    let productObj = {};
    productObj["title"] = await page.$eval(
      `#idProductImg li:nth-child(${idx}) div.title a em.tx_ko`,
      (element) => element.textContent
    );

    productObj["price"] = await page.$eval(
      `#idProductImg li:nth-child(${idx}) em.ssg_price`,
      (element) => element.textContent + "원"
    );
    productObj["link"] = await page.$eval(
      `#idProductImg li:nth-child(${idx}) div.title a`,
      (element) => element.href
    );
    productData.push(productObj);
  }
  console.log(productData);

  console.log("Load 끝");
  await page.close(); // 페이지 닫기
  await browser.close(); // 브라우저 닫기
};

module.exports = crawler;
