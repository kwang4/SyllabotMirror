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
  return db.query('SELECT dep_id,dep_syl_id,dep_typ_id,dep_primary_token,dep_ss_token,dep_socket_token FROM deploy JOIN section_syllabot ON scl_dep_id = dep_id WHERE scl_sec_number=? AND scl_crs_id=?;', [sec_num, sec_crs_id]).then(( { results }) => {
    return results.map(deploy => new Deploy(deploy))
  });
}

function getDeployById(dep_id) {
  return db.query('SELECT * FROM deploy WHERE dep_id=?;', [dep_id]).then(({results}) => {
    console.log(results)
    return new Deploy(results[0])
  })
}

async function getDeployBySectionAndType(sec_crs_id, sec_num, typ_id) {
  try {
    result = await db.query('SELECT dep_id,dep_syl_id,dep_typ_id,dep_primary_token,dep_ss_token,dep_socket_token FROM deploy JOIN section_syllabot ON scl_dep_id = dep_id WHERE scl_sec_number=? AND scl_crs_id=? AND dep_typ_id=?;', [sec_num, sec_crs_id, typ_id]);
    return result;
  } catch (err) {
    throw err
  }
}

async function updateDeploy(primary_token, secondary_token, socket_token, crs_id, sec_num, typ_id) {
  try {
    result = await db.query("UPDATE deploy JOIN section_syllabot ON scl_dep_id = dep_id SET dep_primary_token = ?, dep_ss_token=?, dep_socket_token=? WHERE scl_crs_id = ? AND scl_sec_number = ? AND dep_typ_id = ?", [primary_token, secondary_token, socket_token, crs_id, sec_num, typ_id]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function createDeploy(syl_id, typ_id, primary_token, ss_token, socket_token, crs_id, sec_num) {
  // Check if syllabot exists, if not create default syllabot
  try {
    // Check if syllabot exists
    syllabot = await SyllabotDAO.getSyllabot(syl_id);

    if(!syllabot) {
      // If syllabot is not found create a new syllabot with default values
      syllabot = await SyllabotDAO.createSyllabot(crs_id, "Syllabot", null, null);
    }

    /* Create Deploy
    dep_syl_id = syllabot_val.syl_id
    dep_typ_id = typ_id
    dep_primary_token = primary_token
    dep_ss_token = ss_token
    dep_socket_token = socket_token
    */
    insert_results = await db.query('INSERT INTO deploy (dep_syl_id, dep_typ_id, dep_primary_token, dep_ss_token, dep_socket_token) VALUES (?, ?, ?, ?, ?)', [syllabot.syllabotID, typ_id, primary_token, ss_token, socket_token]);
    new_deploy = await getDeployById(insert_results.results.insertId);

    /* Add to syllabot_section
    scl_dep_id = dep_id (from newly created deploy)
    scl_sec_number = sec_num
    scl_crs_id = crs_id
    */
    new_syllabot_section = await db.query('INSERT INTO section_syllabot (scl_dep_id, scl_sec_number, scl_crs_id) VALUES (?, ?, ?)', [new_deploy.deployID, sec_num, crs_id]);

    // Respond with newly created deploy (response of getDeployById)
    return new_deploy;
  } catch(err) {
    console.log(err);
    return err;
  }
}

module.exports = {
  getDeploys: getDeploys,
  getDeploysBySection: getDeploysBySection,
  getDeployById: getDeployById,
  getDeployBySectionAndType: getDeployBySectionAndType,
  updateDeploy: updateDeploy,
  createDeploy: createDeploy
}