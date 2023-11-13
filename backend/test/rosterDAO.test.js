const vars = require('../test/testVariables');
const RosterDAO = require('../src/data/RosterDAO');
const testVariables = require('../test/testVariables');
const UserDAO = require('../src/data/UserDAO');

function addUserToRosterHelper(crs_id, sec_num, user, role_id) {
  RosterDAO.addUserToRoster(crs_id, sec_num, user, role_id).then(temp => {
    expect(temp[0].courseID).toEqual(crs_id);
    expect(temp[0].sectionID).toEqual(sec_num);
    expect(temp[0].roleID).toEqual(role_id);
    UserDAO.getUserByUnityID("test2id").then(tempUser=>{expect(temp[0].userID).toEqual(tempUser[0].unity_id)});
  });
}

//PASSING
describe('TEST getRosters', () => {
  it('Generic Test', done => {
    RosterDAO.getRosters().then(temp => {
      expect(temp[0].userID).toEqual(3);
      done();
    });
  }, 1000);
});

//PASSING
describe('TEST getRoster', () => {
  it('Generic Test', done => {
    var crs_id = 2;
    var sec_num = 3;
    RosterDAO.getRoster(crs_id, sec_num).then(temp => {
      expect(temp[0].userID).toEqual(3);
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

//PASSING
describe('TEST addUserToRoster', () => {
  it('Generic Test', done => {
    var crs_id = 5;
    var sec_num = 100;
    var user = testVariables.testUser2[0]; //THIS NEEDS TO BE A USER OBJECT, NOT JUST THE ID
    var role_id = 1;
    addUserToRosterHelper(crs_id, sec_num, user, role_id);
    done();
  }, 1000);
});

// I believe this is failing due to usr_id not being an Int (Auto-Generated Number that seems very hard to predict)
describe('TEST updateUserRole', () => {
  it('Generic Test', done => {
    var crs_id = 5;
    var sec_num = 100;
    var user_id = "test2id";
    var role_id = 2;
    RosterDAO.updateUserRole(role_id, crs_id, sec_num, user_id).then(temp => {
      console.log(temp);
      expect(temp).toEqual(1);
      done();
    });
  }, 1000);
});

//PASSING (May Want to Change Criteria so Only Test Data is Deleted and then Change .toEqual(?))
describe('TEST deleteEntireRoster', () => {
  it('Generic Test', done => {
    var crs_id = 5;
    var sec_num = 100;
    RosterDAO.deleteEntireRoster(crs_id, sec_num).then(temp => {
      expect(temp).toEqual(1);
      done();
    });
  }, 1000);
});

// FAILING
describe('TEST deleteUserFromRoster', () => {
  it('Generic Test', done => {
    var crs_id = 5;
    var sec_num = 100;
    var user = testVariables.testUser2[0];
    var role_id = 1;
    addUserToRosterHelper(crs_id, sec_num, user, role_id);
    UserDAO.getUserByUnityID("test2id").then(tempUser=>{
      RosterDAO.deleteUserFromRoster(crs_id, sec_num, tempUser.usr_id).then(temp => {
        expect(temp).toEqual(1);
        done();
      });
    });
  }, 1000);
});