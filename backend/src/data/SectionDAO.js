const db = require('./DBConnection')
const Section = require('./models/Section')
const User = require('./models/User')

function getSectionByCourse(courseID, sectionNumber) {

    return db.query('SELECT * FROM section WHERE courseID = ? AND sectionNum = ?;', [courseID, sectionNumber]).then(({ results }) => {
      return results.map(section => new Section(section));
    })
  }

function getSectionByUserID(userID) {

    return db.query('SELECT * FROM section S JOIN roster R ON S.courseID = R.courseID WHERE userID = ? AND roleID = 2;', [userID]).then(({ results }) => {
      return results.map(section => new Section(section));
    })
  }

function getInstructors(courseID, sectionNumber){
  // courseID = 1 and sectionNum = 2 
    return db.query('SELECT u.userID, u.name FROM user u NATURAL JOIN roster r WHERE r.courseID = ? AND r.sectionNum = ? AND r.roleID = 2;', [courseID, sectionNumber]).then(({ results }) => {
        return results.map(user => new User(user));
      })

}


function createSection(courseID, sectionNum){
  return db.query('INSERT INTO section (courseID, sectionNum) VALUES (?, ?);', [courseID, sectionNum], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    return result.affectedRows;
  });
}

module.exports = {
    getSection: getSection,
    getInstructors: getInstructors,
    createSection: createSection
  }