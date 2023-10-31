//import courseAPI;
const CourseDAO = require('../src/data/CourseDAO');

var course1 = {
  "courseID": 1,
  "semesterID": 1,
  "courseName": "Senior Design"
}

test('Get Course using semesterID and courseID', () => {
  CourseDAO.getCourse(1, 1).then(result=>{
    console.log(result);
    expect(result).toEqual(course1);
  });
});

test('adds 3 - 2 to equal 1', () => {
  expect(3-2).toBe(1);
});

// test('course1 looks like this', () => {
//   expect(CourseDAO.getCourseByID(1)).toBe(course1);
// });