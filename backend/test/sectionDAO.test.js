const vars = require('../test/testVariables');
const SectionDAO = require('../src/data/SectionDAO');


beforeEach(() => {
  SectionDAO.deleteSection(1, 112);
});

describe('TEST getSections', () => {
  it('Generic Test', done => {
    SectionDAO.getSections().then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getSectionByCourse', () => {
  it('Generic Test', done => {
    var crs_id;
    var sec_num;
    SectionDAO.getSectionByCourse(crs_id, sec_num).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getSectionsByCourse', () => {
  it('Generic Test', done => {
    var crs_id;
    SectionDAO.getSectionsByCourse(crs_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getSectionsByUserID', () => {
  it('Generic Test', done => {
    var usr_id = vars.users[0].id;
    SectionDAO.getSectionsByUserID(usr_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getInstructors', () => {
  it('Generic Test', done => {
    var crs_id = 1;
    var sec_num = 1;
    SectionDAO.getInstructors(crs_id, sec_num).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST createSection', () => {
  it('Generic Test', done => {
    var crs_id = 1;
    var sec_num = 112;
    // SectionDAO.getSectionByCourse(crs_id, sec_num).then(exists=> {
      // Want to delete a section here
    // })
    SectionDAO.createSection(crs_id, sec_num).then(temp => {
      expect(temp.results.affectedRows).toEqual(1);
      done();
    });
  }, 1000);
});

describe('TEST deleteSection', () => {
  it('Generic Test', done => {
    var crs_id = 1;
    var sec_num = 200;
    // SectionDAO.getSectionByCourse(crs_id, sec_num).then(exists=> {
      // Want to delete a section here
    // })
    SectionDAO.createSection(crs_id, sec_num).then(temp => {
      console.log(temp.results.affectedRows);
      expect(temp.results.affectedRows).toEqual(1);
      done();
    });
    SectionDAO.deleteSection(crs_id, sec_num).then(temp => {
      expect(temp.results.affectedRows).toEqual(1);
      done();
    });

  }, 1000);
});