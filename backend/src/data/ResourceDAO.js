const db = require('./DBConnection');
const File = require('./models/File');
const User = require('./models/User');
const UserDAO = require('./UserDAO');

function getCourseFiles(scr_sec_number, scr_crs_id) {
  console.log(scr_sec_number);
    //return db.query('SELECT fil_id, fil_link FROM section_resource JOIN file ON scr_fil_id = fil_id WHERE scr_sec_number = ? AND scr_crs_id = ?', [scr_sec_number, scr_crs_id]).then(({results}) => {
    return db.query('SELECT * FROM section_resource JOIN file ON scr_fil_id = fil_id WHERE scr_sec_number = ? AND scr_crs_id = ?;', [scr_sec_number, scr_crs_id]).then(({results}) => {
        return results.map(file => new File(file));
    })
  }

function getFile() {
    return db.query('SELECT * FROM roster').then(({ results }) => {
      return results.map(roster => new Roster(roster));
    })
  }

module.exports = {
    getCourseFiles: getCourseFiles
}