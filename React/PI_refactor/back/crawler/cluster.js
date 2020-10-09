const puppeteer = require("puppeteer");
const { Cluster } = require("puppeteer-cluster");

let db = require("../config/db_config");
let iconv = require("iconv-lite");

function ssgDataInsert(crawlerData) {
  console.log("DataInsert function");

  // crawlerData.forEach((obj) => {
  //   db.query(
  //     `INSERT INTO product(title, price, link, priority)
  //   VALUES(?,?,?,?)`,
  //     [obj.title, obj.price, obj.link, obj.priority],
  //     function (error, result) {
  //       if (error) console.error(error);
  //     }
  //   );
  // });
}

const ssgCrawler = async (page, searchText) => {
  try {
    await page.setDefaultNavigationTimeout(0);

    const ulContentSelector = `#divProductImg > #idProductImg li`;

    const liLength = await page.evaluate((SELECTOR) => {
      //page당 아이템 갯수 출력 80개
      return document.querySelectorAll(SELECTOR).length;
    }, ulContentSelector);
    if (liLength <= 0) {
      //li 태그의 길이가 없다 == 검색결과 없을때 크롤링종료
      console.log("ssg_ li length is zero");
    } else {
      //마지막 페이지 번호를 구함
      const lastPageNumber = await page.$eval(`.btn_last`, (element) => {
        return element.getAttribute("data-filter-value").split("=")[1];
      });
      console.log(lastPageNumber);
      try {
        let productData = [];

        //첫페이지 ~ 3페이지까지 크롤링
        //맨처음 들어오는 값이 page=1임,

        for (
          let pageNumber = 1;
          pageNumber <= lastPageNumber - (lastPageNumber - 3);
          pageNumber++
        ) {
          if (pageNumber != 1) {
            await page.goto(
              `http://www.ssg.com/search.ssg?target=all&query=${searchText}&page=${pageNumber}`,
              { waitUntil: "networkidle2" }
            );
          }
          for (let idx = 1; idx <= liLength; idx++) {
            let productObj = {};
            productObj["priority"] = idx + (pageNumber - 1) * liLength;

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
            console.log(productObj);
          }
        }
        ssgDataInsert(productData);
      } catch (error) {
        if (error) console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const cluster = async () => {
  console.log("클러스터 수행");
  try {
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 2,
    });
    let searchText = "쌀 2kg";
    const ssgSearchURI = `http://www.ssg.com/search.ssg?target=all&query=${searchText}&page=1`;
    const coupangSearchURI = `https://www.coupang.com/np/search?q=${searchText}&channel=user&component=&eventCategory=SRP&trcid=&traid=&sorter=scoreDesc&minPrice=&maxPrice=&priceRange=&filterType=&listSize=36&filter=&isPriceRange=false&brand=&offerCondition=&rating=0&page=1&rocketAll=false&searchIndexingToken=1=4&backgroundColor=`;

    // Define a task (in this case: screenshot of page)
    await cluster.task(async ({ page, data: url }) => {
      await page.setDefaultNavigationTimeout(0);
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        if (
          request.resourceType() === "image" ||
          request.resourceType() === "font" ||
          request.resourceType() == "stylesheet"
        )
          request.abort();
        else request.continue();
      });
      await page.goto(url, { waitUntil: "networkidle0" });

      switch (url) {
        case ssgSearchURI: {
          let data = await ssgCrawler(page, searchText);
          break;
        }
        case "Coupang": {
          console.log(url);
          break;
        }

        default: {
          console.log("디폴트");
          console.log(url);
          break;
        }
      }
    });

    // Add some pages to queue
    cluster.queue(ssgSearchURI);
    cluster.queue(coupangSearchURI);

    // Shutdown after everything is done
    await cluster.idle();
    await cluster.close();
  } catch (error) {
    console.error(error);
  }
  console.log("클러스터 끗");
};
module.exports = cluster;
