const vars = require('../test/testVariables');
const UserDAO = require('../src/data/UserDAO');

describe('TEST getUsers', () => {
  it('Generic Test', done => {
    UserDAO.getUsers().then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getUser', () => {
  it('Generic Test', done => {
    var usr_id;
    UserDAO.getUser(usr_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST getUserByUnityID', () => {
  it('Generic Test', done => {
    var unity_id;
    UserDAO.getUserByUnityID(unity_id).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST createUser', () => {
  it('Generic Test', done => {
    var user;
    UserDAO.createUser(user).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});

describe('TEST deleteUser', () => {
  it('Generic Test', done => {
    var user;
    UserDAO.deleteUser(user).then(temp => {
      expect(true).toEqual(true);
      done();
    });
  }, 1000);
});
