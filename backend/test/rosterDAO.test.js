const vars = require('../test/testVariables');
const RosterDAO = require('../src/data/RosterDAO');

describe('TEST getRosters', () => {
  it('Generic Test', done => {
    RosterDAO.getRosters().then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getRoster', () => {
  it('Generic Test', done => {
    var crs_id = 1;
    var sec_num = 1;
    RosterDAO.getRoster(crs_id, sec_num).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST setRoster', () => {
  it('Generic Test', done => {
    var ros_id = 1;
    var usr_id = 1;
    var sec_num = 1;
    var rol_id = 1;
    RosterDAO.setRoster(ros_id, usr_id, sec_num, rol_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST addUserToRoster', () => {
  it('Generic Test', done => {
    var crs_id;
    var sec_num;
    var user;
    var role_id;
    RosterDAO.addUserToRoster(crs_id, sec_num, user, role_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST updateUserRole', () => {
  it('Generic Test', done => {
    var role_id;
    var crs_id;
    var sec_num;
    var usr_id;
    RosterDAO.updateUserRole(role_id, crs_id, sec_num, usr_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST deleteEntireRoster', () => {
  it('Generic Test', done => {
    var crs_id;
    var sec_num;
    RosterDAO.deleteEntireRoster(crs_id, sec_num).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST deleteUserFromRoster', () => {
  it('Generic Test', done => {
    var crs_id;
    var sec_num;
    var usr_id;
    RosterDAO.deleteUserFromRoster(crs_id, sec_num, usr_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});