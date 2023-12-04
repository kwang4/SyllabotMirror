// const request = require('supertest');
// const server = require('../src/server');
// const vars = require('../test/testVariables');

// // /semesters/:semesterid/courses/:courseid/sections/:sectionNum/resources

// describe('TEST GET /', () => {
//   it('Generic Test', done => {
//     var sem_id;
//     var crs_id;
//     var sec_num;
//     request(server.app).get(`/api/semesters/${sem_id}/courses/${crs_id}/sections/${sec_num}/resources`).then(res => {
//       expect(true).toEqual(true);
//       done();
//     });
//   }, 10000);
// });

// describe('TEST POST /', () => {
//   it('Generic Test', done => {
//     var sem_id;
//     var crs_id;
//     var sec_num;
//     request(server.app).post(`/api/semesters/${sem_id}/courses/${crs_id}/sections/${sec_num}/resources`).then(res => {
//       expect(true).toEqual(true);
//       done();
//     });
//   }, 10000);
// });