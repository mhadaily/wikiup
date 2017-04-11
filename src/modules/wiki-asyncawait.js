const request = require('superagent');
const chalk = require('chalk');

const {apiUrl} = require('./config');

module.exports = async function (q, limit = 3) {
  let result = {};
  try {
    result = await request
      .get(apiUrl)
      .type('json')
      .accept('json')
      .set('User-Agent', 'WikiUp/0.1')
      .query({
        action: 'query',
        srsearch: q,
        srlimit: limit,
        format: 'json',
        srwhat: 'text',
        list: 'search'
      });
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
  return result;
};