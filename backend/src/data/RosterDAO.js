const db = require('./DBConnection')
const Roster = require('./models/Roster')

// NOT TESTED
// This gets all users from every roster
function getRosters() {
  return db.query('SELECT * FROM roster').then(({ results }) => {
    return results.map(roster => new Roster(roster));
  })
}

// NOT TESTED
// This gets ALL users in a section's roster
function getRoster(sectionID){
  return db.query('SELECT * FROM roster WHERE sectionID = ?', [sectionID]).then(({ results }) => {
    return results.map(roster => new Roster(roster));
  })
}

// Not TESTED (This one is going to need some serious work [It'll need to read through a file, create users, add users to roster])
// This should currently only work for adding 1 user to the roster at a time
// Router doesn't give userID, so idk how that'll work currently
function setRoster(rosterID, userID, sectionID, roleID){
  return db.query('INSERT INTO roster WHERE rosterID = ? and userID = ? and sectionID = ? and roleID = ?', [rosterID, userID, sectionID, roleID]).then(({ results }) => {
    return results.map(roster => new Roster(roster));
  })
}

// NOT TESTED
// This deletes a SINGLE user from a Roster (may want to rename)
function deleteRoster(userID, sectionID){
  return db.query('INSERT INTO roster WHERE userID = ? and sectionID = ?', [userID, sectionID]).then(({ results }) => {
    return results.map(roster => new Roster(roster));
    // Maybe just return a success message?
  })
}

// NOT TESTED (This one might need to be in a UserDAO class since it is returning a list of users)
// function getRoleInRoster(sectionID, roleID){
//   return db.query('SELECT u.userID, u.name FROM `syllabot`.`user` u JOIN `syllabot`.`roster` r ON u.userID = r.userID WHERE r.sectionID = ? AND r.roleID = ?;', [sectionID, roleID]).then(({ results }) => {
//     return results.map(roster => new Roster(roster));
//   })
// }

module.exports = {
  getRosters: getRosters,
  getRoster: getRoster,
  setRoster: setRoster,
  deleteRoster: deleteRoster
}