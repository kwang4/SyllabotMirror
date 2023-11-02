const vars = require('../test/testVariables');
const CourseDAO = require('../src/data/CourseDAO');

describe('Get all courses from courseDAO', () => {
  it('Test CourseDAO get all courses', async () => {
    CourseDAO.getCourses().then(courses => {
      expect(courses).toEqual(vars.courses);
    });
  }, 10000);
})

describe('Get a course from courseDAO', () => {
  it('Test CourseDAO get a course', async () => {
    CourseDAO.getCourse(1, 1).then(course => {
      expect(course).toEqual(vars.courses[0]);
    });
  }, 10000);
})

describe('Check if a course exist from courseDAO', () => {
  it('Test CourseDAO to see if course exists', async () => {
    CourseDAO.checkIfCourseExists(1, 1).then(course => {
      expect(course).toEqual(vars.courses[0]);
    });
  }, 10000);
})

describe('Check if can create a course from courseDAO', () => {
  it('Test CourseDAO to see if can create course', async () => {
    CourseDAO.createCourse(1, "Test Course").then(res => {
      expect(res).toEqual(1);
    });
  }, 10000);
})

describe('Check if can delete a course from courseDAO', () => {
  it('Test CourseDAO to see if can delete course', async () => {
    CourseDAO.deleteCourse(1, "Test Course").then(res => {
      expect(res).toEqual(1);
    });
  }, 10000);
})