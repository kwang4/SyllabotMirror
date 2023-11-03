// const vars = require('./testVariables');
// const UserDAO = require('../src/data/UserDAO');

// describe('Get all users from userDAO', done => {
//   it('Test UserDAO get all users', async () => {
//     UserDAO.getUsers().then(users => {
//       expect(users).toEqual(vars.users);
//       done();
//     });
//   }, 10000);
// })


// describe('Get a user from userDAO', done => {
//   it('Test UserDAO get a user', async () => {
//     UserDAO.getUser(1).then(user => {
//       expect(user).toEqual(vars.users[0]);
//       done();
//     });
//   }, 10000);
// })

// describe('Get a user using unityid from userDAO', done => {
//   it('Test UserDAO get a user using unity id', async () => {
//     UserDAO.getUserByUnityID("blpartin").then(user => {
//       expect(user).toEqual(vars.users[0]);
//       done();
//     });
//   }, 10000);
// })

// describe('Check if can create a user from userDAO', () => {
//   it('Test userDAO to see if can create user', async () => {
//     UserDAO.createUser(vars.testUser).then(user => {
//       expect(user).toEqual(vars.testUser);
//     });
//   }, 10000);
// })

// describe('Check if can delete a user from userDAO', () => {
//   it('Test userDAO to see if can delete user', async () => {
//     UserDAO.deleteUser(vars.testUser).then(res => {
//       expect(res).toEqual(1);
//     });
//   }, 10000);
// })