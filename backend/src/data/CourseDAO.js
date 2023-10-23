const db = require('./DBConnection')
const Course = require('./models/Course')

function getCourses() {
  console.log(roles_user.TEACHER);
  return db.query('SELECT * FROM course').then(({ results }) => {
    return results.map(course => new Course(course));
  })
}

function getCourse(crs_sem_id, crs_id){
  return db.query('SELECT * FROM course WHERE crs_sem_id = ? and crs_id = ?', [crs_sem_id, crs_id]).then(({ results }) => {
    return results.map(course => new Course(course));
  })
}

function getCourseByID(crs_id){
  return db.query('SELECT * FROM course WHERE crs_id = ?', [crs_id]).then(({ results }) => {
    return results.map(course => new Course(course));
  })
}

function checkIfCourseExists(crs_sem_id, crs_name){
  return db.query('SELECT * FROM course WHERE crs_sem_id = ? and crs_name= ?', [crs_sem_id, crs_name]).then(({ results }) => {
    return results.map(course => new Course(course));
  })
}
function createCourse(crs_sem_id, crs_name){
  
  return db.query('INSERT INTO course (crs_sem_id, crs_name) VALUES (?, ?);', [crs_sem_id, crs_name], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    return result.affectedRows;
  });
}

//Not TESTED
function setCourse(crs_sem_id, crs_name){
  return db.query('INSERT INTO course WHERE crs_sem_id = ? and crs_name = ?', [crs_id, crs_name]).then(({ results }) => {
    return results.map(course => new Course(course));
  })
}

// function getInstructors(crs_id, sectionNum){
//   // crs_id = 1
//     return db.query('SELECT u.userID, u.name FROM user u NATURAL JOIN roster r WHERE r.crs_id = ? AND r.sectionNum = ? AND r.roleID = 2;', [crs_id, sectionNum]).then(({ results }) => {
//         return results.map(user => new User(user));
//       })

// }

module.exports = {
  getCourses: getCourses,
  getCourse: getCourse,
  getCourseByID: getCourseByID,
  createCourse: createCourse,
  checkIfCourseExists: checkIfCourseExists
  // getInstructors: getInstructors
}