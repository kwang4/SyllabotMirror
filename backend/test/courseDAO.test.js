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

describe('TEST getCourseByID', () => {
  it('Test CourseDAO get a course by ID', done => {
    CourseDAO.getCourseByID(vars.courses[0].courseID).then(course => {
      expect(course).toEqual(vars.courses[0]);
      done();
    });
  }, 1000);
})

describe('TEST getCourseByName', () => {
  it('Test CourseDAO get a course by Name', done => {
    CourseDAO.getCourseByName(vars.courses[0].courseName, vars.courses[0].semesterID).then(course => {
      expect(course).toEqual(vars.courses[0]);
      done();
    });
  }, 1000);
})

describe('TEST checkIfCourseExists', () => {
  it('Test CourseDAO to see if course exists', done => {
    CourseDAO.checkIfCourseExists(1, "Senior Design").then(course => {
      expect(course.courseName).toEqual(vars.courses[0].courseName);
      done();
    });
  }, 1000);
});

describe('TEST createCourse', () => {
  it('Test CourseDAO to see if can create course', done => {
    CourseDAO.createCourse(1, "Test Course").then(res => {
      expect(res.affectedRows).toEqual(1);
      done();
    });
  }, 1000);
});

describe('TEST deleteCourse', () => {
  it('Test CourseDAO to see if can delete course', done => {
    CourseDAO.deleteCourse(1, "Test Course").then(res => {
      expect(res.affectedRows).toEqual(1);
      done();
    });
  }, 1000);
});