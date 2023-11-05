const vars = require('../test/testVariables');
const CourseDAO = require('../src/data/CourseDAO');

describe('TEST getCourses', () => {
  it('Test CourseDAO get all courses', done => {
    CourseDAO.getCourses().then(courses => {
      expect(courses).toEqual(vars.courses);
      done();
    });
  }, 1000);
});

describe('TEST getCourse', () => {
  it('Test CourseDAO get a course', done => {
    CourseDAO.getCourse(1, 1).then(course => {
      expect(course).toEqual(vars.courses[0]);
      done();
    });
  }, 1000);
});

describe('TEST getCourse', () => {
  it('Test CourseDAO get all courses', done => {
    
  }, 1000);
});

describe('TEST getCourseByID', () => {
  it('Test CourseDAO get all courses', done => {
    
  }, 1000);
})

describe('TEST checkIfCourseExists', () => {
  it('Test CourseDAO to see if course exists', done => {
    CourseDAO.checkIfCourseExists(1, 1).then(course => {
      expect(course).toEqual(vars.courses[0]);
      done();
    });
  }, 1000);
});

describe('TEST createCourse', () => {
  it('Test CourseDAO to see if can create course', done => {
    CourseDAO.createCourse(1, "Test Course").then(res => {
      expect(res).toEqual(1);
      done();
    });
  }, 1000);
});

describe('TEST deleteCourse', () => {
  it('Test CourseDAO to see if can delete course', done => {
    CourseDAO.deleteCourse(1, "Test Course").then(res => {
      expect(res).toEqual(1);
      done();
    });
  }, 1000);
});