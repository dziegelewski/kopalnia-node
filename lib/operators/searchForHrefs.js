const { Observable } = require('rxjs');
const { flatMap } = require('lodash');
const cheerio = require('cheerio');


const searchForHrefs = (hrefs, discardHTML = true) => (in$) => Observable.create((subscriber) => {

  function next(article) {
    const $ = cheerio.load(article.html);

    const foundHrefs = withPathnamesAsSeparateItems(hrefs).filter((href) => {
      return $(`body a[href="${href}"]`).length > 0
    });

    if (discardHTML) {
      delete article.html;
    }

    subscriber.next({
      ...article,
      foundHrefs,
    });
  }

  const subscription = in$.subscribe(
    next,
    (err) => subscriber.error(err),
    () => subscriber.complete(),
  );

  return subscription;
});

const withPathnamesAsSeparateItems = (hrefs) => flatMap(hrefs, (href) => [
  href,
  new URL(href).pathname,
]);

module.exports = searchForHrefs;