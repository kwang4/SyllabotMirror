const vars = require('../test/testVariables');
const CourseDAO = require('../src/data/CourseDAO');

describe('Get all courses', () => {
  it('Test CourseDAO get all courses', async () => {
    CourseDAO.getCourses().then(courses => {
      expect(courses).toEqual(vars.courses);
    });
  }, 10000);
})