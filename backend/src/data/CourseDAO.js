const db = require('./DBConnection')
const Course = require('./models/Course')

function getCourses() {
  return db.query('SELECT * FROM course').then(({ results }) => {
    return results.map(course => new Course(course));
  })
}

function getCourse(semesterID, courseID){
  return db.query('SELECT * FROM course WHERE semesterID = ? and courseID = ?', [semesterID, courseID]).then(({ results }) => {
    return results.map(course => new Course(course));
  })
}

function createCourse(semesterID, courseName) {
  return db.query('INSERT INTO course (courseID, semesterID, courseName) VALUES (NULL, ?, ?)',
  [semesterID, courseName]).then(({ results }) => {
    console.log(results)
    return getCourse(semesterID, results.insertId)
  })
}

module.exports = {
  getCourses: getCourses,
  getCourse: getCourse,
  createCourse: createCourse
}