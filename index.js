const streamUrls = require('./lib/streamUrls');
const { partition } = require('rxjs/operators');
const {
  filterOutPages,
  fetchHTML,
  searchForHrefs,
  hasAnyFoundHrefs,
} = require('./lib/operators');
const Options = require('./lib/options');
const Reporter = require('./lib/reporter');


const options = new Options();
const source = options.getSource();
const searchedLink = options.getSearchedLink();

if (!source || !searchedLink) {
  throw new Error('You must provide both xlsx file containg urls to check and link to search for. Check README.md for more info.')
}

const reporter = Reporter.create({ searchedLink });


const urls$ = streamUrls(source)
  .pipe(
    filterOutPages(),
    fetchHTML(),
    searchForHrefs([searchedLink]),
  );


const [urlsFound$, urlsNotFound$] = urls$.pipe(
  partition(
    hasAnyFoundHrefs()
  )
);


urlsFound$.subscribe(reporter.Found);
urlsNotFound$.subscribe(reporter.NotFound);

