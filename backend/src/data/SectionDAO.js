const db = require('./DBConnection')
const Section = require('./models/Section')

function getSection(courseID, sectionNumber) {
    console.log('SELECT * FROM section WHERE cID = '+ courseID +' AND sectionNumber = '+ sectionNumber +';')
    return db.query('SELECT * FROM section WHERE cID = ? AND sectionNumber = ?;', [courseID, sectionNumber]).then(({ results }) => {
      return results.map(section => new Section(section));
    })
  }

module.exports = {
    getSection: getSection
  }