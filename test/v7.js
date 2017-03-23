const {describe, it} = require('mocha');
const {expect} = require('chai');
const wikiAsync = require('../src/modules/wiki-asyncawait');
const {q, limit} = require('./constant');

module.exports = () => {
  describe('Wiki Async/Await Functions', () => {
    it('should return Love with 3 results', (done) => {
      wikiAsync(q)
        .then(res => {
          expect(res.body.query.search[0].title).to.equal(q);
          expect(res.body.query.search.length).to.equal(3);//default limit is 3
          done();
        })
        .catch(err => done(err));
    });

    it(`should return results as many as ${limit}`, (done) => {
      wikiAsync(q, limit)
        .then(res => {
          expect(res.body.query.search.length).to.equal(limit);
          done();
        })
        .catch(err => done(err));
    });
  });
};