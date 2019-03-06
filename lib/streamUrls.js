const xlsx = require('node-xlsx');
const { flatten } = require('lodash');
const{ from } = require('rxjs');
const{ map, switchMap } = require('rxjs/operators');


async function extractUrls(fileSource) {
  const workSheetsFromFile = await xlsx.parse(fileSource);
  const urls = flatten(
    workSheetsFromFile[0].data
  );

  return urls;
}

function streamUrls(fileSource) {
  return from(
    extractUrls(fileSource)
  )
    .pipe(
      switchMap(
        (urls) => from(urls)
          .pipe(
            map((url, index) => ({
              url,
              index,
              total: urls.length
            }))
          )
      )
    );
}

module.exports = streamUrls;