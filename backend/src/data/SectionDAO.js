const db = require('./DBConnection')
const Section = require('./models/Section')
const User = require('./models/User')

function getSection(courseID, sectionNumber) {

    return db.query('SELECT * FROM section WHERE courseID = ? AND sectionNumber = ?;', [courseID, sectionNumber]).then(({ results }) => {
      return results.map(section => new Section(section));
    })
  }

function getInstructors(sectionID){
    // (2,2,1,2)
    console.log("SectionID " + sectionID)
    return db.query('SELECT u.userID, u.name FROM user u JOIN roster r ON u.userID = r.userID WHERE r.sectionID = ? AND r.roleID = 2;', [sectionID]).then(({ results }) => {
        return results.map(user => new User(user));
      })

}

module.exports = {
    getSection: getSection,
    getInstructors: getInstructors
  }