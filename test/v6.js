const {describe, it} = require('mocha');
const {expect} = require('chai');
const wikiPromise = require('../src/modules/wiki-promise');
const {q} = require('./constant');

module.exports = () => {
  describe('Wiki Promise Based Function', () => {
    it('should return Love page', (done) => {
      wikiPromise(q)
        .then(res => {
          expect(res.body.query.search[0].title).to.equal(q);
          done();
        })
        .catch(err => done(err));
    });
  });
};
