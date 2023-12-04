const vars = require('../test/testVariables');
const UserDAO = require('../src/data/UserDAO');
const testVariables = require('../test/testVariables');

//PASSING
describe('TEST getUsers', () => {
  it('Generic Test', done => {
    UserDAO.getUsers().then(temp => {
      expect(temp).toEqual(testVariables.users);
      done();
    });
  }, 1000);
});

//PASSING
describe('TEST getUser', () => {
  it('Generic Test', done => {
    var usr_id = testVariables.users[0].id;
    UserDAO.getUser(usr_id).then(temp => {
      expect(temp).toEqual(testVariables.users[0]);
      done();
    });
  }, 1000);
});

//PASSING
describe('TEST getUserByUnityID', () => {
  it('Generic Test', done => {
    var unity_id = testVariables.users[0].unity_id;
    UserDAO.getUserByUnityID(unity_id).then(temp => {
      expect(temp).toEqual(testVariables.users[0]);
      done();
    });
  }, 1000);
});

//PASSING
describe('TEST createUser', () => {
  it('Generic Test', done => {
    var user = testVariables.testUser[0];
    UserDAO.createUser(user).then(temp => {
      expect(temp.unity_id).toEqual(user.unity_id);
      done();
    });
  }, 1000);
});

//PASSING
describe('TEST deleteUser', () => {
  it('Generic Test', done => {
    var user = testVariables.testUser[0];
    UserDAO.deleteUser(user).then(temp => {
      expect(temp.results.affectedRows).toEqual(1);
      done();
    });
  }, 1000);
});
