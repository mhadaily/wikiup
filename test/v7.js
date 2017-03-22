const {describe, it} = require('mocha');
const {expect} = require('chai');
const wikiAsync = require('../src/modules/wiki-asyncawait');
const {q} = require('./constant');

module.exports = () => {
  describe('Wiki Async/Await Functions', () => {
    it('should return Love', (done) => {
      wikiAsync(q)
        .then(res => {
          expect(res.body.query.search[0].title).to.equal(q);
          done();
        })
        .catch(err => done(err));
    });
  });
};