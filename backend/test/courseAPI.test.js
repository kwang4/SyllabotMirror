//import courseAPI;
const CourseDAO = require('../src/data/CourseDAO');

var course1 = {
  "courseID": 1,
  "semesterID": 1,
  "courseName": "Senior Design"
}

test('adds 1 + 2 to equal 3', () => {
  console.log(CourseDAO.getCourse(1, 1));
  expect(1+2).toBe(3);
});

test('adds 3 - 2 to equal 1', () => {
  expect(3-2).toBe(1);
});

// test('course1 looks like this', () => {
//   expect(CourseDAO.getCourseByID(1)).toBe(course1);
// });