const vars = require('../test/testVariables');
const DeployDAO = require('../src/data/DeployDAO');

//PASSING
describe('TEST getDeploys', () => {
  it('Generic Test', done => {
    DeployDAO.getDeploys().then(deploys => {
      expect(deploys).toEqual(vars.deploys);
      done();
    });
  }, 1000);
});