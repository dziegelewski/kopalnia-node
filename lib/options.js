const argv = require('yargs').argv;

class Options {
  constructor(args = argv) {
    this.args = args;
  }

  getSource() {
    return (
      this.args.source
      || this.args.in
      || `${__dirname}/../source.xlsx`
    );
  }

  getSearchedLink() {
    return (
      this.args.searched_link
      || this.args.find
    );
  }
}

module.exports = Options;
