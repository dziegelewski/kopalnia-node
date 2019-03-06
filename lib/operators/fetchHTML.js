const { Observable } = require('rxjs');
const { concatMap } = require('rxjs/operators');
const rp = require('request-promise');


const fetchHTML = () => concatMap((article) => Observable.create(async (subscriber) => {

    try {
      const html = await rp({ url: article.url });

      const result = {
          ...article,
        html,
      };
      subscriber.next(result);
      subscriber.complete();
    } catch(err) {
      subscriber.error(err);
    }

}));



module.exports = fetchHTML;