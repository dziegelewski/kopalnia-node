const rp = require('request-promise');
const cheerio = require('cheerio');

const getText$ = async (url) => {

  const options = {
    url,
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  try {
    const $ = await rp(options);
    return $('body');

  } catch(err) {
    console.log(err);
    return 'ERROR';
  }
};

module.exports = getText$;
