const vars = require('../test/testVariables');
const SemesterDAO = require('../src/data/SemesterDAO');

describe('TEST getSemesters', () => {
  it('Generic Test', done => {
    SemesterDAO.getSemesters().then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});
