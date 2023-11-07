const vars = require('../test/testVariables');
const UserDAO = require('../src/data/UserDAO');
const testVariables = require('../test/testVariables');

describe('TEST getUsers', () => {
  it('Generic Test', done => {
    UserDAO.getUsers().then(temp => {
      expect(temp).toEqual(testVariables.users);
      done();
    });
  }, 1000);
});

describe('TEST getUser', () => {
  it('Generic Test', done => {
    var usr_id = testVariables.users[0].id;
    UserDAO.getUser(usr_id).then(temp => {
      expect(temp).toEqual(testVariables.users[0]);
      done();
    });
  }, 1000);
});

describe('TEST getUserByUnityID', () => {
  it('Generic Test', done => {
    var unity_id = testVariables.users[0].unity_id;
    UserDAO.getUserByUnityID(unity_id).then(temp => {
      expect(temp).toEqual(testVariables.users[0]);
      done();
    });
  }, 1000);
});

// This seems to be running through the duplicate path rather than a regular one, not sure why yet
describe('TEST createUser', () => {
  it('Generic Test', done => {
    var user = testVariables.testUser;
    UserDAO.createUser(user).then(temp => {
      expect(temp).toEqual(user);
      done();
    });
  }, 1000);
});

// This will fail if createUser fails
describe('TEST deleteUser', () => {
  it('Generic Test', done => {
    var user = testVariables.testUser;
    UserDAO.deleteUser(user).then(temp => {
      // STILL NEEDS TO BE TESTED PROPERLY
      expect(temp).toEqual(1);
      done();
    });
  }, 1000);
});
