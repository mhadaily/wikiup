const request = require('superagent');
const chalk = require('chalk');

const {apiUrl} = require('./config');

module.exports = (q, limit = 3) => {
  return request
    .get(apiUrl)
    .type('json')
    .accept('json')
    .set('User-Agent', 'WikiUp/0.1')
    .query({action: 'query'})
    .query({srsearch: q})
    .query({srlimit: limit})
    .query({format: 'json'})
    .query({list: 'search'});
};

