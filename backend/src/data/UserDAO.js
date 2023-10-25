const db = require('./DBConnection')
const User = require('./models/User')

function getUser(usr_id) {

    return db.query('SELECT * FROM user WHERE usr_id = ?;', [usr_id]).then(({ results }) => {
      return new User(results[0]);
    })
  }

function getUserByUnityID(usr_unity_id) {

    return db.query('SELECT * FROM user WHERE usr_unity_id = ?;', [usr_unity_id]).then(({ results }) => {
      return new User(results[0]);
    })
}  

module.exports = {
    getUser : getUser,
    getUserByUnityID : getUserByUnityID
  }