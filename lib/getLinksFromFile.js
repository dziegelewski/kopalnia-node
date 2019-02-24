const xlsx = require('node-xlsx')
const { flatten } = require('lodash');

module.exports = async function(fileSource) {
  const workSheetsFromFile = await xlsx.parse(fileSource);
  return flatten(workSheetsFromFile[0].data);
}