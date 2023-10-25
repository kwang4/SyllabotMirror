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

// Takes user object as input
function createUser(user){
  return db.query('INSERT INTO user (usr_is_admin, usr_first_name, usr_last_name, usr_unity_id) VALUES (0, ?, ?, ?)', [user.first_name, user.last_name, user.unity_id]).catch(function(){
    console.log('Duplicate user'); 
  }).then(()=>{
    return db.query('SELECT * FROM user WHERE usr_unity_id = ?;', [user.unity_id]).then(({results}) => {
      return results.map(user => new User(user));
    }); 
  });
}

module.exports = {
    getUser : getUser,
    getUserByUnityID : getUserByUnityID,
    createUser: createUser
  }