const db = require('./DBConnection')
const User = require('./models/User')

function getUser(usr_id) {

    return db.query('SELECT * FROM user WHERE usr_id = ?;', [usr_id]).then(({ results }) => {
      return results.map(user => new User(user));
    })
  }

function getUserByUnityID(usr_unity_id) {

    return db.query('SELECT * FROM user WHERE usr_unity_id = ?;', [usr_unity_id]).then(({ results }) => {
      return results.map(user => new User(user));
    })
}  

module.exports = {
    getUser : getUser,
    getUserByUnityID : getUserByUnityID
  }