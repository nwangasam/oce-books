const rp = require('request-promise');
const $ = require('cheerio');

const query = 'an enemy called average';

const url = encodeURI(`https://b-ok.cc/s/${query}`);

rp(url)
  .then(function (html) {
    const allBooks = [];

    $('.resItemBox', html).each(function (el, i) {
      const book = $('[itemprop=name]', this).text().replace(/[\n\r][^\x00-\xFF]/gu, '').trim();
      const author = $('.authors', this).text();
      const imageUrl = $('img', this).data('src');
      const publisher = $('[title=Publisher] > a', this).text();
      const yearPublished = $('.property_year .property_value', this).text();
      const file = $('.property__file .property_value', this).text();

      allBooks.push({ book, author, imageUrl, publisher, yearPublished, file });
    });

    console.log(allBooks);
  })
  .catch(function (err) {
    //handle error
  });

console.log('Done!', url);
