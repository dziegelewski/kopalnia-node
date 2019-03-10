# kopalnia-node

Console tool to webcrawl multiple pages and check which of them contain a link to given url.

At first it meant to be a super-simple tool just to help my girlfriend with her work, but later on I decided to take the opportunity to practice Rx.js a little bit - so refactored the whole thing to play around this library a little bit.

# usage

Requires `node` >= 10.

Run `index.js` in terminal with node. There are two required options:

- `source` (alias `in`) - path to spreadshot with all the webpages to check.

- `searched_link` (alias `find`) - url to search for in all that webpages.


Example:

``
node index --in '/home/user/kopalnia-node/source.xlsx' --find https://google.com
``
