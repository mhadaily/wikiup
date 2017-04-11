const request = require('superagent');
const chalk = require('chalk');

const {apiUrl} = require('./config');

module.exports = (q, limit = 3) => {
  return request
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
    })
};

