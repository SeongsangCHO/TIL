const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
let db = require("../config/db_config");
let iconv = require("iconv-lite");

const coupangCrawler = async () => {

  //Common part//
  const browser = await puppeteer.launch({ headless: false });
  await browser.userAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
  );
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({
    "accept-charset": "euc-kr", //한글 깨지는 문제를 해결해보려고 charset을 바꿔봤는데 해결안됨
  });
  // await page.setRequestInterception(true);
  // page.on("request", (request) => {
  //   if (
  //     request.resourceType() === "image" ||
  //     request.resourceType() === "font" ||
  //     request.resourceType() == "stylesheet"
  //   )
  //     request.abort();
  //   else request.continue();
  // });
  //링크 title을 요청받아와서 사용
  let searchText = "쌀 2kg";
  //searchText로 db에 저장하고
  //이를 외래키로 지정해서 하위 데이터들을 추가시켜주어야하네..a1


  //시간제한 없애기
  await page.setDefaultNavigationTimeout(0);
  //동시에 여러 페이지 newPage로 띄워서  promise.all로 각각 페이지를 모듈로 나눠서 크롤링실행해야겠다.
  await page.goto(
    `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=1&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`,
    //page로 넘기면 검색가능
    { waitUntil: "networkidle2" }
  );
  //Common part//

}
module.exports = coupangCrawler;