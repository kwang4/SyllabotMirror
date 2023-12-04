const request = require('supertest');
const server = require('../src/server');
const vars = require('../test/testVariables');
//const request = require('./commonTests');
// describe('TEST GET /:courseid', () => {
//   it('Generic Test', done => {
//     var sem_id;
//     var crs_id;
//     request(server.app).get(`/api/semesters/${sem_id}/courses/${crs_id}`).then(res => {
//       expect(true).toEqual(true);
//       done();
//     });
//   }, 10000);
// });

// describe('TEST GET /', () => {
//   it('Generic Test', async() => {
//     var sem_id = 1;
//     const res = await request(server.app).get(`/api/semesters/${sem_id}/courses`);
//       console.log(res.body);
//     expect(res.status).toEqual(200);
//     done();
    
//   }, 1000);
// });

// describe('TEST POST /', () => {
//   it('Generic Test', async() => {
//     var sem_id = 2;
//     const res = await request(server.app).post(`/api/semesters/${sem_id}/courses`);
//       console.log(res.body);
//     expect(res.status).toEqual(200);
//   }, 10000);
// });

// describe('TEST DELETE /:courseid', () => {
//   it('Generic Test', async() => {
//     var sem_id = 1;
//     var crs_id = 1;
//     const res = await request(server.app).delete(`/api/semesters/${sem_id}/${crs_id}`);
//       console.log(res.body);
//     expect(res.status).toEqual(200);
//   }, 10000);
// });