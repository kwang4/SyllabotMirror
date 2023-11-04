const db = require('./DBConnection');
const File = require('./models/File');

// const multer  = require('multer');
// const upload = multer({ dest: './uploads/' });

const User = require('./models/User');
const UserDAO = require('./UserDAO');

function getCourseFiles(scr_sec_number, scr_crs_id) {
  console.log(scr_sec_number);
    //return db.query('SELECT fil_id, fil_link FROM section_resource JOIN file ON scr_fil_id = fil_id WHERE scr_sec_number = ? AND scr_crs_id = ?', [scr_sec_number, scr_crs_id]).then(({results}) => {
    return db.query('SELECT * FROM section_resource JOIN file ON scr_fil_id = fil_id WHERE scr_sec_number = ? AND scr_crs_id = ?;', [scr_sec_number, scr_crs_id]).then(({results}) => {
        return results.map(file => new File(file));
    })
  }

function uploadFile(scr_sec_number, scr_crs_id, original_name, file_path, file_parsedpath){
  return db.query('INSERT INTO file (fil_link, fil_name, fil_parsed_link) VALUES (?, ?, ?)', [file_path, original_name, file_parsedpath]).then(()=>{
    return getFile(file_path, original_name).then(results =>{
      return db.query('INSERT INTO section_resource (scr_crs_id, scr_sec_number, scr_fil_id) VALUES (?,?,?)', [scr_sec_number, scr_crs_id, results[0].id]).then(()=>{
        return results;
      });
    });
  });
}

function getResources(scr_sec_number, scr_crs_id){
  return db.query('SELECT * FROM section_resource WHERE scr_sec_number = ? AND scr_crs_id = ?', [scr_sec_number, scr_crs_id]).then(({ results }) => {
    return results.map(resource => new Resource(resource));
  })
}
function getFile(fil_link, fil_name) {
    return db.query('SELECT * FROM file WHERE fil_link = ? AND fil_name = ?', [fil_link, fil_name]).then(({ results }) => {
      return results.map(file => new File(file));
    })
  }

// This is just here to make sure we are not making duplicates
function getUniqueFile(fileName, courseid, sectionNumber){
  return db.query('SELECT * FROM file JOIN section_resource ON fil_id = scr_fil_id WHERE fil_name like ? AND scr_crs_id = ? AND scr_sec_number = ?', [fileName, courseid, sectionNumber]).then((results)=>{
    return results.map(file => new File(file));
  })

}

module.exports = {
    getCourseFiles: getCourseFiles,
    uploadFile: uploadFile,
    getResources: getResources,
    getUniqueFile: getUniqueFile
}