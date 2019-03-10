const argv = require('yargs').argv;

class Options {
  constructor(args = argv) {
    this.args = args;
  }

  getSource() {
    return (
      this.args.SOURCE
      || this.args.source
      || this.args.in
      || `${__dirname}/../source.xlsx`
    );
  }

  getSearchedLink() {
    return (
      this.args.SEARCHED_LINK
      || this.args.searched_link
      || this.args.find
      || 'https://www.kopalnia.pl/'
    );
  }
}

module.exports = Options;
