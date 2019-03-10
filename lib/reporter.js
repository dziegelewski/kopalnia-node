const { Subject } = require('rxjs');
const { green, cyan } = require('chalk');
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

  static create(...args) {
    const reporter = new Reporter(...args);

    reporter.Found.subscribe(
      (article) => {
        reporter.found.push(article)
      },
    );

    const subscription = {
      next: reporter.handleData,
      error: () => {},
      complete: reporter.handleComplete,
    };

    reporter.Found.subscribe(subscription);
    reporter.NotFound.subscribe(subscription);

    return reporter;
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

  display(...args) {
    console.clear();
    console.log(`Searching for url ${cyan(this.searchedLink)}`);
    console.log(args.join('\n'))
  }

  processedInfo(article) {
    return `Processed ${cyan(article.index)} of ${article.total} articles`
  }

  foundInfo() {
    let output = '\n\n'
    if (this.found.length) {
      output += `Found searched link in ${green(this.found.length)} articles`;
    } else {
      output +='Not found anything yet.'
    }
    return output;
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
    return green(
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
