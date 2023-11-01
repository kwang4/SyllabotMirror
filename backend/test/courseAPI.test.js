const request = require('supertest');
const server = require('../src/server');
const vars = require('../test/testVariables');

describe('Get Course', () => {
  it('Should get course 1 from semester 1', async () => {
    const res = await request(server.app).get('/semesters/1/courses/1/');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(vars.courses[0]);
      //console.log(res.body)
  }, 10000);
});
