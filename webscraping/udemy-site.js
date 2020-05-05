const puppeteer = require('puppeteer');
const $ = require('cheerio');

const url = 'https://www.udemy.com';

puppeteer
  .launch({
    headless: false,
    executablePath:
      'C:/Users/SAMMY/AppData/Local/Google/Chrome/Application/chrome.exe',
  })
  .then(function (browser) {
    return browser.newPage();
  })
  .then(function (page) {
    return page
      .goto(url, {
        timeout: 100000,
        waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
      })
      .then(function () {
        return page.content();
      });
  })
  .then(function (html) {
    return $('.merchandising-course-card--mask--2-b-d', html).map(function (
      i,
      el
    ) {
      const imageUrl = $('img', this).attr('src');
      const title = $('[data-purpose=course-card-title]', this).text();
      const instructors = $(
        '[data-purpose=course-card-instructor-titles]',
        this
      ).text();
      const rating = +$('[data-purpose=course-card-star-rating]', this).text();
      const reviews = +$('[data-purpose=course-card-review-count]', this)
        .text()
        .replace(/[(),]/g, '');
      const currentPrice = +$(
        '[data-purpose=course-price-text] span',
        this
      ).last().text().replace(/[$]/g, '');
      const originalPrice = +$(
        '[data-purpose=course-old-price-text] span',
        this
      ).last().text().replace(/[$]/g, '');
      return {
        imageUrl,
        title,
        instructors,
        rating,
        reviews,
        currentPrice,
        originalPrice,
      };
    });
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  });
