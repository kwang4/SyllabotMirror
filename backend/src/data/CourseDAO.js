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

function checkIfCourseExists(semesterID, courseName){
  return db.query('SELECT * FROM course WHERE semesterID = ? and courseName= ?', [semesterID, courseName]).then(({ results }) => {
    return results.map(course => new Course(course));
  })
}
function createCourse(semesterID, courseName){
  
  return db.query('INSERT INTO course (semesterID, courseName) VALUES (?, ?);', [semesterID, courseName], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    return result.affectedRows;
  });
}

//Not TESTED
function setCourse(semesterID, courseName){
  return db.query('INSERT INTO course WHERE semesterID = ? and courseName = ?', [courseID, courseName]).then(({ results }) => {
    return results.map(course => new Course(course));
  })
}

module.exports = {
  getCourses: getCourses,
  getCourse: getCourse,
  createCourse: createCourse,
  checkIfCourseExists: checkIfCourseExists
}