const vars = require('../test/testVariables');
const RosterDAO = require('../src/data/RosterDAO');

//CHECK
describe('TEST getRosters', () => {
  it('Generic Test', done => {
    RosterDAO.getRosters().then(temp => {
      expect(temp[0].userID).toEqual(3);
      done();
    });
  }, 1000);
});

//CHECK
describe('TEST getRoster', () => {
  it('Generic Test', done => {
    var crs_id = 2;
    var sec_num = 3;
    RosterDAO.getRoster(crs_id, sec_num).then(temp => {
      expect(temp[0].ueserID).toEqual(3);
      done();
    });
  }, 1000);
});

// THIS MAY BE AN UNECESARY FUNCTION ALL TOGETHER
// //NEEDS WORK (Query Seems Wrong)
// describe('TEST setRoster', () => {
//   it('Generic Test', done => {
//     var ros_id = 1;
//     var usr_id = 1;
//     var sec_num = 1;
//     var rol_id = 1;
//     RosterDAO.setRoster(ros_id, usr_id, sec_num, rol_id).then(temp => {
//       expect(true).toEqual(true);
//       done();
//     });
//   }, 1000);
// });

//FAILING (Can't read usr_id)
describe('TEST addUserToRoster', () => {
  it('Generic Test', done => {
    var crs_id = 5;
    var sec_num = 100;
    var user_id = "testUser2"; //THIS NEEDS TO BE A USER OBJECT, NOT JUST THE ID
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

//FAILING
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