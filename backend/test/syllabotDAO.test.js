const vars = require('../test/testVariables');
const SyllabotDAO = require('../src/data/SyllabotDAO');

describe('TEST getSyllabots', () => {
  it('Generic Test', done => {
    SyllabotDAO.getSyllabots().then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getSyllabot', () => {
  it('Generic Test', done => {
    var syl_id;
    SyllabotDAO.getSyllabot(syl_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST createSyllabot', () => {
  it('Generic Test', done => {
    var crs_id;
    var name;
    var prompt_flavor;
    var profile_pic;
    SyllabotDAO.createSyllabot(crs_id, name, prompt_flavor, profile_pic).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST updateSyllabot', () => {
  it('Generic Test', done => {
    var syl_id;
    var name;
    var prompt_flavor;
    var profile_pic;
    SyllabotDAO.updateSyllabot(syl_id, name, prompt_flavor, profile_pic).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

