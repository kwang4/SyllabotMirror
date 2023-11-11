const vars = require('../test/testVariables');
const SyllabotDAO = require('../src/data/SyllabotDAO');

//PASSSING
describe('TEST getSyllabots', () => {
  it('Generic Test', done => {
    SyllabotDAO.getSyllabots().then(temp => {
      expect(temp[0].name).toEqual("Sylla_1");
      done();
    });
  }, 1000);
});

//PASSING
describe('TEST getSyllabot', () => {
  it('Generic Test', done => {
    var syl_id = 1;
    SyllabotDAO.getSyllabot(syl_id).then(temp => {
      expect(temp.name).toEqual("Sylla_1");
      done();
    });
  }, 1000);
});

//PASSING
describe('TEST createSyllabot', () => {
  it('Generic Test', done => {
    var crs_id = 1;
    var name = "Test Syllabot";
    var prompt_flavor = "tpf";
    var profile_pic = "tpp";
    SyllabotDAO.createSyllabot(crs_id, name, prompt_flavor, profile_pic).then(temp => {
      expect(temp.results.affectedRows).toEqual(1);
      done();
    });
  }, 1000);
});

//PASSING (When syl_id is auto-generated "correctly", for whatever reason it starts at 7 instead of 6)
//FAILING otherwise
describe('TEST updateSyllabot', () => {
  it('Generic Test', done => {
    var syl_id = 7;
    var name = "New Test Syllabot Name";
    var prompt_flavor = "ntpf";
    var profile_pic = "ntpp";
    SyllabotDAO.updateSyllabot(syl_id, name, prompt_flavor, profile_pic).then(temp => {
      expect(temp.results.affectedRows).toEqual(1);
      done();
    });
  }, 1000);
});


//NEED A DELETE TEST WHEN DAO FUNCTION IS MADE

