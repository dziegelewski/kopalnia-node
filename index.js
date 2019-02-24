const chalk = require('chalk');
const { stripIndents } = require('common-tags');

const getLinksFromFile = require('./lib/getLinksFromFile');
const saveLinksToFile = require('./lib/saveLinksToFile');
const getText$ = require('./lib/getText$');
const hasHref = require('./lib/hasHref');

const SEARCHED_LINKS = [
  'https://www.kopalnia.pl/zwiedzanie/kopalnia-dla-duzych-i-malych/pobyty-nocne-pod-ziemia',
  'zwiedzanie/kopalnia-dla-duzych-i-malych/pobyty-nocne-pod-ziemia'
  // 'https://uzdrowisko.kopalnia.pl/cenniki/pobyty-lecznicze/zdrowy-sen',
  // '/cenniki/pobyty-lecznicze/zdrowy-sen'
];


async function main() {
  let found = [];
  let links = await getLinksFromFile(`${__dirname}/source.xlsx`)
    .then(filterOutPages);

  console.log(stripIndents`
    Szukane urle:
    ${SEARCHED_LINKS.join('\n')}
    Stron do sprawdzenia: ${links.length}
  `)
  console.log('')
  for (let index = 0; index < links.length; index++) {
    const link = links[index];
    const $linkHtml = await getText$(link);
    const $content = $linkHtml.find('#content');
    const hasLink = await hasAnyOfLinks($content, SEARCHED_LINKS);

    if (hasLink) {
      found.push(link);
      console.log(`${chalk.green(link)}`);
    } else {
      console.log(chalk.red(link));
    }
    console.log(`Postęp: ${index}/${links.length}, znaleziono: ${found.length}`)
    console.log('')
  }

  console.log(stripIndents`
  Link znaleziono w ${found.length} artykułach:
   ${found.join('\n')}
  `)
}

async function hasAnyOfLinks($content, links) {
  let result = false;

  for (const link of links) {
    if (await hasHref($content, link)) {
      result = true;
      break;
    }
  }

  return result;
}

function filterOutPages(links) {
  return links.filter(isNotPage);
}

function isNotPage(url) {
  return !url.includes('page=')
}

main();