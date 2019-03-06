const streamUrls = require('./lib/streamUrls');
const { share, partition } = require('rxjs/operators');
const {
  filterOutPages,
  fetchHTML,
  searchForHrefs,
  hasAnyFoundHrefs,
} = require('./lib/operators')

const SOURCE = `${__dirname}/source.xlsx`;
const SEARCHED_LINK =
  'https://www.kopalnia.pl/';

  const urls$ = streamUrls(SOURCE)
    .pipe(
      share(),
      filterOutPages(),
      fetchHTML(),
      searchForHrefs([SEARCHED_LINK]),
    );

  urls$
    .subscribe(
      (article) => console.log(`Article ${article.index} from ${article.total}`)
    )

  const [urlsFound$, urlsNotFound$] = urls$.pipe(
    partition(
      hasAnyFoundHrefs()
    )
  );


  urlsFound$
    .subscribe(
      (article) => console.log('found')
    );

  urlsNotFound$
    .subscribe(
      () => console.log('NOUT FOUND')
    );



