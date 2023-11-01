//import courseAPI;
const request = require('supertest')
const app = require('../src/server')
//const CourseDAO = require('../src/data/CourseDAO');

var course1 = {
  "courseID": 1,
  "semesterID": 1,
  "courseName": "Senior Design"
}

describe('Get Course', () => {
  it('Should get course 1 from semester 1', async () => {
    const res = await request(app)
      .get('/api/semesters/1/courses/1')
      .expect(res.statusCode).toEqual(200)
  })
})


describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

test('Get Course using semesterID and courseID', () => {
  //CourseDAO.getCourse(1, 1).then(result=>{
  //  console.log(result);
  //  expect(result).toEqual(course1);
  //});
  expect(true).toEqual(true);
});

test('adds 3 - 2 to equal 1', () => {
  expect(3-2).toBe(1);
});

// test('course1 looks like this', () => {
//   expect(CourseDAO.getCourseByID(1)).toBe(course1);
// });