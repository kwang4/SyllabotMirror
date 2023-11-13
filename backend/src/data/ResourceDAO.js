const db = require('./DBConnection');
const File = require('./models/File');
const Resource = require('./models/Resource');

// const multer  = require('multer');
// const upload = multer({ dest: './uploads/' });

const User = require('./models/User');
const UserDAO = require('./UserDAO');
const fs = require('fs');

function getCourseFiles(scr_sec_number, scr_crs_id) {
  console.log(scr_sec_number);
    //return db.query('SELECT fil_id, fil_link FROM section_resource JOIN file ON scr_fil_id = fil_id WHERE scr_sec_number = ? AND scr_crs_id = ?', [scr_sec_number, scr_crs_id]).then(({results}) => {
    return db.query('SELECT * FROM section_resource JOIN file ON scr_fil_id = fil_id WHERE scr_sec_number = ? AND scr_crs_id = ?;', [scr_sec_number, scr_crs_id]).then(({results}) => {
        return results.map(file => new File(file));
    })
  }

  function getResourcePath(scr_sec_number, scr_crs_id,scr_fil_id) {
    console.log(scr_sec_number);
      //return db.query('SELECT fil_id, fil_link FROM section_resource JOIN file ON scr_fil_id = fil_id WHERE scr_sec_number = ? AND scr_crs_id = ?', [scr_sec_number, scr_crs_id]).then(({results}) => {
      return db.query('SELECT fil_link FROM section_resource JOIN file ON scr_fil_id = fil_id WHERE scr_sec_number = ? AND scr_crs_id = ? AND fil_id=?;', [scr_sec_number, scr_crs_id,scr_fil_id]).then(({results}) => {
          return results[0];
      })
    }

function uploadFile(scr_sec_number, scr_crs_id, original_name, file_path, file_parsedpath){
  return db.query('INSERT INTO file (fil_link, fil_name, fil_parsed_link) VALUES (?, ?, ?)', [file_path, original_name, file_parsedpath]).then(()=>{
    return getFile(file_path, original_name).then(results =>{
      return db.query('INSERT INTO section_resource (scr_sec_number,scr_crs_id, scr_fil_id) VALUES (?,?,?)', [scr_sec_number, scr_crs_id, results[0].id]).then(()=>{
        return results;
      });
    });
  });
}

function deleteFile(fil_id){
  return db.query('SELECT fil_link,fil_parsed_link FROM file WHERE fil_id=?', [fil_id]).then((queryResponse)=>{
    const fil_link = queryResponse?.results[0]?.fil_link;
    const fil_parsed_link = queryResponse?.results[0]?.fil_parsed_link;
    console.log(fil_link + "\n" + fil_parsed_link);

      return db.query('DELETE FROM section_resource WHERE scr_fil_id = ?', [fil_id]).then(()=> {
        return db.query('DELETE FROM file WHERE fil_id = ?', [fil_id],function(err2,res2) {
          if(err2) throw err2;
            //Delete file from upload folder and parsed file
            if(fil_link)
            {
              fs.unlink(fil_link,(errDel1)=>{
                if(errDel1) throw errDel1;
              });
            }
          if(fil_parsed_link)
          {
            fs.unlink(fil_parsed_link,(errDel2)=>{
              if(errDel2) throw errDel2;
             });
          }
          console.log(res2);
          
          return res2.affectedRows;
      });
    }).catch(err=>{
      console.log(err);
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
    getResourcePath: getResourcePath,
    uploadFile: uploadFile,
    deleteFile: deleteFile,
    getFile: getFile,
    getResources: getResources,
    getUniqueFile: getUniqueFile
}