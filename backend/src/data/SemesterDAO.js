const db = require('./DBConnection')
const Semester = require('./models/Semester')

// NOT TESTED
// This returns all semesters
function getSemesters() {
  return db.query('SELECT * FROM semester').then(({ results }) => {
    // console.log(results);
    return results.map(semester => new Semester(semester));
  })
}

module.exports = {
  getSemesters: getSemesters
}