const { filter } = require('rxjs/operators');

const hasAnyFoundHrefs = () => article => article.foundHrefs.length > 0;

module.exports = hasAnyFoundHrefs;
