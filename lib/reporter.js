const { Subject } = require('rxjs');
const chalk = require('chalk');
const { stripIndents } = require('common-tags');
const { takeRight } = require('lodash');


class Reporter {

  constructor({ searchedLink }) {
    this.searchedLink = searchedLink;

    this.found = [];
    this.Found = new Subject();
    this.NotFound = new Subject();

    this.handleData = this.handleData.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  display(...args) {
    console.clear();
    console.log(`Searching for url ${this.searchedLink}`);
    console.log(args.join('\n'))
  }

  static create(...args) {
    const logger = new Reporter(...args);

    logger.Found.subscribe(
      (article) => {
        logger.found.push(article)
      },
    );

    const subscription = {
      next: logger.handleData,
      error: () => {},
      complete: logger.handleComplete,
    };

    logger.Found.subscribe(subscription);
    logger.NotFound.subscribe(subscription);

    return logger;
  }

   handleData(article) {
    this.display(
      this.processedInfo(article),
      this.foundInfo(),
      this.foundList({ last: 10 }),
    );
  }

  handleComplete() {
    this.display(
      'Finished',
      this.foundList(),
    )
  }

  processedInfo(article) {
    return `Processed article ${article.index} from ${article.total}`
  }

  foundInfo() {
    if (this.found.length) {
      return `Found ${this.found.length}`;
    }
    return 'Not found anything yet.'
  }

  foundList({ last } = {}) {
    const foundLength = this.found.length;

    if (foundLength) {

      const overflowNumber = foundLength - last;

      const list = this.successUrlsList(
        last ? takeRight(this.found, last) : this.found
      );


      return this.listOverflow(overflowNumber)
        + list;
    }
  }

  successUrlsList(articles) {
    return chalk.green(
        articles
        .map(article => article.url)
        .join('\n')
    );
  }

  listOverflow(exceededNumber) {
    const display = exceededNumber > 0;
    return '\n'
      + stripIndents`
      ${display ? `(${exceededNumber} more)` : ''}
      ${display ? '...' : ''}
    `
      + '\n';
  }
}


module.exports = Reporter;
