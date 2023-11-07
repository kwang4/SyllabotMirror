const vars = require('../test/testVariables');
const RosterDAO = require('../src/data/SectionDAO');

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
    var crs_id = 1;
    var sec_num = 112;
    RosterDAO.createSection(crs_id, sec_num).then(temp => {
      expect(temp.crs_id).toEqual(crs_id);
      expect(temp.sec_num).toEqual(sec_num);
      done();
    });
  }, 1000);
});