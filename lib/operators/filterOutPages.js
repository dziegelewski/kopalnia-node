const { filter } = require('rxjs/operators');

const filterOutPages = () => {
  return filter(article => !article.url.includes('page='));
};

module.exports = filterOutPages;