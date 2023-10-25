const db = require('./DBConnection');
const Roster = require('./models/Roster');
const User = require('./models/User');
const UserDAO = require('./UserDAO');



// NOT TESTED
// This gets all users from every roster
function getRosters() {
  return db.query('SELECT * FROM roster').then(({ results }) => {
    return results.map(roster => new Roster(roster));
  })
}

// NOT TESTED
// This gets ALL users in a section's roster
function getRoster(ros_sec_number){
  return db.query('SELECT * FROM roster WHERE ros_sec_number = ?', [ros_sec_number]).then(({ results }) => {
    return results.map(roster => new Roster(roster));
  })
}

// Not TESTED (This one is going to need some serious work [It'll need to read through a file, create users, add users to roster])
// This should currently only work for adding 1 user to the roster at a time
// Router doesn't give ros_usr_id, so idk how that'll work currently
function setRoster(rosterID, ros_usr_id, ros_sec_number, ros_rol_id){
  return db.query('INSERT INTO roster WHERE rosterID = ? and ros_usr_id = ? and ros_sec_number = ? and ros_rol_id = ?', [rosterID, ros_usr_id, ros_sec_number, ros_rol_id]).then(({ results }) => {
    return results.map(roster => new Roster(roster));
  })
}

// ros_crs_id, ros_sec_number, ros_rol_id, usr_first_name, usr_last_name, usr_unity_id
function addUserToRoster(ros_crs_id, ros_sec_number, user, role_id){
  // Insert new user
  // TODO is there a better way to search for duplicates Call USER DAO to create a new user
  return UserDAO.createUser(user).then(results => {
    new_user = results[0];
    return db.query('INSERT INTO roster (ros_crs_id, ros_sec_number, ros_usr_id, ros_rol_id) VALUES (?, ?, ?, ?)', [ros_crs_id, ros_sec_number, new_user.id, role_id]).then(() =>{
      return db.query('SELECT * FROM roster WHERE ros_crs_id = ? AND ros_sec_number = ?', [ros_crs_id, ros_sec_number]).then(result=>{
        return result.results.map(roster => new Roster(roster));
      });
    });
  });
}
  
  


// SAME AS setRoster, but may want different naming convention for editing/adding a roster
function addRoster(rosterID, ros_usr_id, ros_sec_number, ros_rol_id){
  return db.query('INSERT INTO roster WHERE rosterID = ? and ros_usr_id = ? and ros_sec_number = ? and ros_rol_id = ?', [rosterID, ros_usr_id, ros_sec_number, ros_rol_id]).then(({ results }) => {
    return results.map(roster => new Roster(roster));
  })
}
// NOT TESTED
// This deletes a SINGLE user from a Roster (may want to rename)
function deleteRoster(ros_usr_id, ros_sec_number){
  return db.query('INSERT INTO roster WHERE ros_usr_id = ? and ros_sec_number = ?', [ros_usr_id, ros_sec_number]).then(({ results }) => {
    return results.map(roster => new Roster(roster));
    // Maybe just return a success message?
  })
}

// NOT TESTED (This one might need to be in a UserDAO class since it is returning a list of users)
// function getRoleInRoster(ros_sec_number, ros_rol_id){
//   return db.query('SELECT u.ros_usr_id, u.name FROM `syllabot`.`user` u JOIN `syllabot`.`roster` r ON u.ros_usr_id = r.ros_usr_id WHERE r.ros_sec_number = ? AND r.ros_rol_id = ?;', [ros_sec_number, ros_rol_id]).then(({ results }) => {
//     return results.map(roster => new Roster(roster));
//   })
// }

module.exports = {
  getRosters: getRosters,
  getRoster: getRoster,
  setRoster: setRoster,
  deleteRoster: deleteRoster,
  addRoster: addRoster,
  addUserToRoster: addUserToRoster
}