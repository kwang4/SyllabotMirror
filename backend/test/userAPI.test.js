const request = require('supertest');
const server = require('../src/server');
const vars = require('../test/testVariables');

// describe('TEST GET /:userid/courses', () => {
//     it('Generic Test', done => {
//       var usr_id;
//       request(server.app).get(`/api/users/${usr_id}/courses`).then(res => {
//         expect(true).toEqual(true);
//         done();
//       });
//     }, 10000);
//   });

// describe('TEST GET /unityid/:unityid/courses', () => {
// it('Generic Test', done => {
//     var unity_id;
//     request(server.app).get(`/api/users/unityid/${unity_id}/courses`).then(res => {
//         expect(true).toEqual(true);
//         done();
//     });
//     }, 10000);
// });

describe('TEST GET /unityid/:unityid/courses', () => {
    it('Generic Test', done => {
        const unity_id = 'blpartin'; // Replace with a valid unity ID
        request(server.app).get(`/api/users/unityid/${unity_id}/courses`)
            .then(res => {
                expect(res.statusCode).toBe(200); // or any other assertion
                done();
            })
            .catch(err => done(err)); // Catch any errors
    }, 10000);
});

// describe('TEST GET /:userid', () => {
// it('Generic Test', done => {
//     var usr_id;
//     request(server.app).get(`/api/users/${usr_id}`).then(res => {
//         expect(true).toEqual(true);
//         done();
//     });
//     }, 10000);
// });

// describe('TEST GET /unityid/:unityid', () => {
//     it('Generic Test', done => {
//         var unity_id;
//         request(server.app).get(`/api/users/${unity_id}`).then(res => {
//             expect(true).toEqual(true);
//             done();
//         });
//         }, 10000);
//     });

// describe('TEST GET /', () => {
// it('Generic Test', done => {
//     request(server.app).get(`/api/users/`).then(res => {
//         expect(true).toEqual(true);
//         done();
//     });
//     }, 10000);
// });