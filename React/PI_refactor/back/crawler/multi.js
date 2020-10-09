const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
let db = require("../config/db_config");
let iconv = require("iconv-lite");

const multi = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    await browser.userAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36"
    );
    const pages = await Promise.all([
      browser.newPage(),
      browser.newPage(),
      browser.newPage(),
    ]);
    await Promise.all([
      await pages[0].goto(`https://www.naver.com`),
      await pages[1].goto(`https://www.coupang.com`),
      await pages[2].goto(`https://www.youtube.com`),
    ]);
  } catch (error) {
    console.error(error);
  }
};

module.exports = multi;
