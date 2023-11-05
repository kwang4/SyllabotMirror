const vars = require('../test/testVariables');
const SectionDAO = require('../src/data/SectionDAO');

describe('TEST getSections', () => {
  it('Generic Test', done => {
    RosterDAO.getSections().then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getSectionByCourse', () => {
  it('Generic Test', done => {
    var crs_id;
    var sec_num;
    RosterDAO.getSectionByCourse(crs_id, sec_num).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getSectionsByCourse', () => {
  it('Generic Test', done => {
    var crs_id;
    RosterDAO.getSectionsByCourse(crs_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getSectionsByUserID', () => {
  it('Generic Test', done => {
    var usr_id;
    RosterDAO.getSectionsByUserID(usr_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getInstructors', () => {
  it('Generic Test', done => {
    var crs_id;
    var sec_num;
    RosterDAO.getInstructors(crs_id, sec_num).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST createSection', () => {
  it('Generic Test', done => {
    var crs_id;
    var sec_num;
    RosterDAO.createSection(crs_id, sec_num).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});