const db = require('./DBConnection')
const User = require('./models/User')

function getUsers() {

  return db.query('SELECT * FROM user').then(({ results }) => {
    return results.map(user => new User(user));
  })
}


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

// Takes user object as input
function createUser(user){
  return db.query('INSERT INTO user (usr_is_admin, usr_formal_name, usr_preferred_name, usr_unity_id) VALUES (0, ?, ?, ?)', [user.formal_name, user.preferred_name, user.unity_id]).catch(function(){
    console.log('Duplicate user'); 
  }).then(()=>{
    return db.query('SELECT * FROM user WHERE usr_unity_id = ?;', [user.unity_id]).then(({results}) => {
      return results.map(user => new User(user));
    }); 
  });
}


// Takes user object as input
function deleteUser(user){
  return db.query('DELETE FROM user WHERE usr_unity_id = ?', [user.unity_id], function (err, result) {
    if (err) throw err;
    return result.affectedRows;
  });
}

module.exports = {
    getUsers : getUsers,
    getUser : getUser,
    getUserByUnityID : getUserByUnityID,
    createUser: createUser,
    deleteUser : deleteUser
  }