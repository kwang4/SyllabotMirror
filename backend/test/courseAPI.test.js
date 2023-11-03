// const request = require('supertest');
// const server = require('../src/server');
// const vars = require('../test/testVariables');

// describe('Get Course', done => {
//   it('Should get course 1 from semester 1', async () => {
//     const res = await request(server.app).get('/semesters/1/courses/1/');
//       expect(res.statusCode).toEqual(200);
//       expect(res.body).toEqual(vars.courses[0]);
//       //console.log(res.body)
//       done();
//   }, 10000);
// });

// test('COUNT CHECK', () => {
//   expect(true).toEqual(false);
// })

// describe('Fail Check', () => {
//   expect(true).toBe(true)
//   expect(true).toBe(false)
// });

// describe('Fail Check', () => {
//   test('Test Check', () => {
//     expect(true).toBe(true)
//     expect(true).toBe(false)
//   });
// });

// describe('Fail Check', () => {
//   it('It Check', () => {
//     expect(true).toBe(true)
//     expect(true).toBe(false)
//   });
// });