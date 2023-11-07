const vars = require('../test/testVariables');
const RosterDAO = require('../src/data/RosterDAO');

// Needs to have actual values tested
describe('TEST getRosters', () => {
  it('Generic Test', done => {
    RosterDAO.getRosters().then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

// Needs to have actual values tested
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

// Needs to have actual values tested
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
    var crs_id = 5;
    var sec_num = 100;
    var user_id = "testUser2";
    var role_id = 1;
    RosterDAO.addUserToRoster(crs_id, sec_num, user_id, role_id).then(temp => {
      expect(temp.user_id).toEqual(user_id);
      done();
    });
  }, 1000);
});

// I believe this is failing due to usr_id not being an Int
describe('TEST updateUserRole', () => {
  it('Generic Test', done => {
    var crs_id = 5;
    var sec_num = 100;
    var user_id = "testUser2";
    var role_id = 2;
    RosterDAO.updateUserRole(role_id, crs_id, sec_num, user_id).then(temp => {
      expect(temp).toEqual(1);
      done();
    });
  }, 1000);
});

describe('TEST deleteEntireRoster', () => {
  it('Generic Test', done => {
    var crs_id = 5;
    var sec_num = 100;
    RosterDAO.deleteEntireRoster(crs_id, sec_num).then(temp => {
      expect(temp).toEqual(2);
      done();
    });
  }, 1000);
});

// I believe this is failing due to usr_id not being an Int
describe('TEST deleteUserFromRoster', () => {
  it('Generic Test', done => {
    var crs_id = 5;
    var sec_num = 100;
    var usr_id = "testUser2";
    RosterDAO.deleteUserFromRoster(crs_id, sec_num, usr_id).then(temp => {
      expect(temp).toEqual(1);
      done();
    });
  }, 1000);
});