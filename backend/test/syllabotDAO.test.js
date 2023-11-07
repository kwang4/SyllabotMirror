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
    var syl_id = 1;
    SyllabotDAO.getSyllabot(syl_id).then(temp => {
      expect(temp.syl_name).toEqual("Sylla_1");
      done();
    });
  }, 1000);
});

describe('TEST createSyllabot', () => {
  it('Generic Test', done => {
    var crs_id = 1;
    var name = "Test Syllabot";
    var prompt_flavor = "tpf";
    var profile_pic = "tpp";
    SyllabotDAO.createSyllabot(crs_id, name, prompt_flavor, profile_pic).then(temp => {
      expect(temp).toEqual(1);
      done();
    });
  }, 1000);
});

describe('TEST updateSyllabot', () => {
  it('Generic Test', done => {
    var syl_id = 6;
    var name = "New Test Syllabot Name";
    var prompt_flavor = "ntpf";
    var profile_pic = "ntpp";
    SyllabotDAO.updateSyllabot(syl_id, name, prompt_flavor, profile_pic).then(temp => {
      expect(temp.syl_name).toEqual(name);
      expect(temp.syl_prompt_flavor).toEqual(prompt_flavor);
      expect(temp.syl_profile_picture).toEqual(profile_pic);
      done();
    });
  }, 1000);
});

