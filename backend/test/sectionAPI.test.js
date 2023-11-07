const request = require('supertest');
const server = require('../src/server');
const vars = require('../test/testVariables');

const express = require('express');

const app = express();

const path = `https://localhost:80/api`;

// // /semesters/:semesterid/courses/:courseid/sections

describe('TEST GET /:sectionNum', () => {
  it('Generic Test', done => {
    var sem_id = 1;
    var crs_id = 1;
    var sec_num = 1;
    request(app).get(path + `/semesters/${sem_id}/courses/${crs_id}/sections/${sec_num}`).then(res => {
        expect(res).toBeDefined()
      expect(res.status).toEqual(200);
      done();
    });
  }, 1000);
});

// describe('TEST DELETE /:sectionNum', () => {
//   it('Generic Test', done => {
//     var sem_id;
//     var crs_id;
//     var sec_num;
//     // Time constraint figure out delete skeleton
//     expect(true).toEqual(true);
//   }, 10000);
// });

// describe('TEST POST /', () => {
//   it('Generic Test', done => {
//     var sem_id;
//     var crs_id;
//     // Time constraint figure out post skeleton
//     expect(true).toEqual(true);
//   }, 10000);
// });

// // COUPLE MORE API FUNCTIONS IN SECTION API BUT UNSURE OF IF THEY ARE USED AT ALL