const db = require('./DBConnection')
const SyllabotDAO = require('./SyllabotDAO')
const Deploy = require('./models/Deploy')

// This returns all Syllabot instances
function getDeploys() {
  return db.query('SELECT * FROM deploy').then(({ results }) => {
    return results.map(deploy => new Deploy(deploy));
  });
}

function getDeploysBySection(sec_crs_id, sec_num) {
  return db.query('SELECT dep_id,dep_syl_id,dep_typ_id,dep_primary_token FROM deploy JOIN section_syllabot ON scl_dep_id = dep_id WHERE scl_sec_number=? AND scl_crs_id=?;', [sec_crs_id, sec_num]).then(( { results }) => {
    return results.map(deploy => new Deploy(deploy))
  });
}

function getDeployById(dep_id) {
  return db.query('SELECT * FROM deploy WHERE dep_id=?;', [dep_id]).then(({results}) => {
    return new Deploy(results[0])
  })
}

function createDeploy(syl_id, typ_id, primary_token, ss_token, socket_token, crs_id, sec_num) {
  // Check if syllabot exists, if not create default syllabot
  SyllabotDAO.getSyllabot(syl_id).then(syllabot => {
    syllabot_val = syllabot;
    if (!syllabot) {
      //TODO THIS IS ASYNC MAKE WAIT FOR THIS TO FINISH BEFORE CONTINUE
      SyllabotDAO.createSyllabot(crs_id, "Syllabot", null, null).then(new_syllabot => {
        syllabot_val = new_syllabot;
        console.log(syllabot_val);
      });
    }
/*
    return db.query('INSERT INTO deploy (dep_syl_id, dep_typ_id, dep_primary_token, dep_ss_token, dep_socket_token) VALUES (?, ?, ?, ?, ?)', [syllabot_val.syl_id, typ_id, primary_token, ss_token, socket_token], function(err, result) {
      console.log(result);
      return getDeployById().then(results =>{
        return db.query('INSERT INTO section_resource (scr_sec_number,scr_crs_id, scr_fil_id) VALUES (?,?,?)', [scr_sec_number, scr_crs_id, results[0].id]).then(()=>{
          return results;
        });
      });
    });
    // Create Deploy
    /*
    dep_syl_id = syllabot_val.syl_id
    dep_typ_id = typ_id
    dep_primary_token = primary_token
    dep_ss_token = ss_token
    dep_socket_token = socket_token
    */

    // Add to syllabot_section
    /*
    scl_dep_id = dep_id (from newly created deploy)
    scl_sec_number = sec_num
    scl_crs_id = crs_id
    */

   // Respond with newly created deploy
  });
}

module.exports = {
  getDeploys: getDeploys,
  getDeploysBySection: getDeploysBySection,
  createDeploy: createDeploy
}