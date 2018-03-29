const { expect } = require('ultimate-chai');
const sinon = require('sinon');
const logstub = sinon.stub();

const constants = require('../../lib/constants');

describe('lib/constants.js', () => {
  context('when constants are called', () => {
    
    it('FILES should equal files', (done) => {
      expect(constants.FILES).to.equal('files');
      done();
    });
    
    it('FILE should equal file', (done) => {
      expect(constants.FILE).to.equal('file');
      done();
    });
    
    it('FILE should equal file', (done) => {
      expect(constants.DIRECTORY).to.equal('directory');
      done();
    });
    
  });

});