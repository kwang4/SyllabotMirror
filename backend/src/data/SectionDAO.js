const db = require('./DBConnection')
const Section = require('./models/Section')
const User = require('./models/User')

function getSectionByCourse(sec_crs_id, sec_number) {

    return db.query('SELECT * FROM section WHERE sec_crs_id = ? AND sec_number = ?;', [sec_crs_id, sec_number]).then(({ results }) => {
      return results.map(section => new Section(section));
    })
  }

function getSectionsByCourse(sec_crs_id) {

  return db.query('SELECT * FROM section WHERE sec_crs_id = ?;', [sec_crs_id]).then(({ results }) => {
    return results.map(section => new Section(section));
  })
}

function getSectionsByUserID(ros_usr_id) {

    return db.query('SELECT * FROM section S JOIN roster R ON S.sec_crs_id = R.ros_crs_id WHERE ros_usr_id = ? AND ros_rol_id = 2;', [ros_usr_id]).then(({ results }) => {
      return results.map(section => new Section(section));
    })
  }

function getInstructors(ros_crs_id, ros_sec_number){
  // courseID = 1 and sectionNum = 2 
    return db.query('SELECT u.usr_id, u.usr_first_name, u.usr_last_name FROM user u NATURAL JOIN roster r WHERE r.ros_crs_id = ? AND r.ros_sec_number = ? AND r.ros_rol_id = 2;', [ros_crs_id, ros_sec_number]).then(({ results }) => {
        return results.map(user => new User(user));
      })

}


function createSection(sec_crs_id, sec_number){
  return db.query('INSERT INTO section (sec_crs_id, sec_number) VALUES (?, ?);', [sec_crs_id, sec_number], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    return result.affectedRows;
  });
}

module.exports = {
    getSectionsByCourse: getSectionsByCourse,
    getSectionByCourse: getSectionByCourse,
    getSectionsByUserID: getSectionsByUserID,
    getInstructors: getInstructors,
    createSection: createSection
  }