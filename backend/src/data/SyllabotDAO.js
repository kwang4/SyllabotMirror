const db = require('./DBConnection')
const Syllabot = require('./models/Syllabot')

// This returns all Syllabot instances
function getSyllabots() {
  return db.query('SELECT * FROM syllabot').then(({ results }) => {
    return results.map(syllabot => new Syllabot(syllabot));
  })
}

function getSyllabot(syl_id) {
  return db.query('SELECT * FROM syllabot WHERE syl_id = ?;', [syl_id]).then(({ results }) => {
    if (results.length == 0) {
      return false;
      //return {error: `Syllabot with id ${syl_id} not found`}
    }
    return new Syllabot(results[0]);
  });
}

function createSyllabot(syl_crs_id, syl_name, syl_prompt_flavor, syl_profile_picture) {
  return db.query('INSERT INTO syllabot (syl_crs_id, syl_name, syl_prompt_flavor, syl_profile_picture) VALUES (?, ?, ?, ?);', [syl_crs_id, syl_name, syl_prompt_flavor, syl_profile_picture]).then(({results}) => {
    //console.log(result);
    let id = results.insertId;
    return db.query('SELECT * FROM SYLLABOT WHERE syl_id = ?;', [id]).then(({ results }) => {
      return new Syllabot(results[0])
    });
  })
  .catch(err => {
    throw err;
  });
}

// function deleteSyllabot(syl_id) {
//   return db.query('DELETE FROM syllabot WHERE syl_id = ?;', [syl_id], function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     return result.affectedRows;
//   })
// }

function updateSyllabot(syl_id, syl_name, syl_prompt_flavor, syl_profile_picture) {
  return db.query('UPDATE syllabot SET syl_name = ?, syl_prompt_flavor = ?, syl_profile_picture = ? WHERE syl_id = ?', [syl_name, syl_prompt_flavor, syl_profile_picture, syl_id], function (err, result) {
    if (err) throw err;
    return result.affectedRows;
  });
}

module.exports = {
  getSyllabots: getSyllabots,
  getSyllabot: getSyllabot,
  createSyllabot: createSyllabot,
  //deleteSyllabot: deleteSyllabot,
  updateSyllabot: updateSyllabot
}