const filterOutPages = require('./filterOutPages');
const fetchHTML = require('./fetchHTML');
const searchForHrefs = require('./searchForHrefs');
const hasAnyFoundHrefs = require('./hasAnyFoundHrefs');

module.exports = {
  filterOutPages,
  fetchHTML,
  searchForHrefs,
  hasAnyFoundHrefs,
};