// const request = require('supertest');
// const server = require('../src/server');
// const vars = require('../test/testVariables');

// // /semesters/:semesterid/courses/:courseid/sections/:sectionNum/roster

// describe('TEST GET /:sectionid', () => {
//   it('Generic Test', done => {
//     var sem_id;
//     var crs_id;
//     var sec_num;
//     var sec_id;
//     request(server.app).get(`/api/semesters/${sem_id}/courses/${crs_id}/sections/${sec_num}/roster/${sec_id}`).then(res => {
//       expect(true).toEqual(true);
//       done();
//     });
//   }, 10000);
// });

describe('TEST GET /', () => {
  it('Generic Test', done => {
    var sem_id;
    var crs_id;
    var sec_num;
    request(server.app).get(`/api/semesters/${sem_id}/courses/${crs_id}/sections/${sec_num}/roster`).then(res => {
      expect(true).toEqual(true);
      done();
    });
  }, 10000);
});

// describe('TEST POST /', () => {
//   it('Generic Test', done => {
//     var sem_id;
//     var crs_id;
//     var sec_num;
//     request(server.app).post(`/api/semesters/${sem_id}/courses/${crs_id}/sections/${sec_num}/roster`).then(res => {
//         expect(true).toEqual(true);
//         done();
//       });
//   }, 10000);
// });

// describe('TEST DELETE /', () => {
//   it('Generic Test', done => {
//     var sem_id;
//     var crs_id;
//     var sec_num;
//     request(server.app).delete(`/api/semesters/${sem_id}/courses/${crs_id}/sections/${sec_num}/roster`).then(res => {
//         expect(true).toEqual(true);
//         done();
//       });
//   }, 10000);
// });

// describe('TEST DELETE /users/:userid', () => {
//   it('Generic Test', done => {
//     var sem_id;
//     var crs_id;
//     var sec_num;
//     var usr_id;
//     request(server.app).delete(`/api/semesters/${sem_id}/courses/${crs_id}/sections/${sec_num}/roster/users/${usr_id}`).then(res => {
//         expect(true).toEqual(true);
//         done();
//       });
//   }, 10000);
// });