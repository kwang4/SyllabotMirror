const db = require('./DBConnection')
const User = require('./models/User')

function getUsers() {

  return db.query('SELECT * FROM user').then(({ results }) => {
    return results.map(user => new User(user));
  })
}


async function getUser(usr_id) {
  let users = await db.query('SELECT * FROM user WHERE usr_id = ?;', [usr_id]);
  let users_obj = users.results.map(user => new User(user));
  if (users_obj.length == 0) {
    return false;
  }
  // Assumes only one user per usr_id
  return users_obj[0];

  // return db.query('SELECT * FROM user WHERE usr_id = ?;', [usr_id]).then(({ results }) => {
  //   return new User(results[0]);
  // })
}

async function getUserByUnityID(usr_unity_id) {
  try {
    let users = await db.query('SELECT * FROM user WHERE usr_unity_id = ?;', [usr_unity_id]);
    let users_obj = users.results.map(user => new User(user));
    if (users_obj.length == 0) {
      return false;
    }
    // Assumes only one user per unity id
    return users_obj[0];
  } catch (err) { 
    throw err;
  }
    // return db.query('SELECT * FROM user WHERE usr_unity_id = ?;', [usr_unity_id]).then(({ results }) => {
    //   return new User(results[0]);
    // })
}  

// Takes user object as input
async function createUser(user){
  try {
    // Check if user already exists
    let user_obj = await getUserByUnityID(user.unity_id);
    if (user_obj) {
      throw new Error(`User with UnityID ${user.unity_id} already exists`);
    }
    // add user
    let insert_results = await db.query('INSERT INTO user (usr_is_admin, usr_formal_name, usr_preferred_name, usr_unity_id, usr_is_teacher) VALUES (0, ?, ?, ?, ?)', [user.formal_name, user.preferred_name, user.unity_id, user.is_teacher]);
    if (insert_results.results.affectedRows == 0) {
      throw new Error('Error adding user');
    }

    // Return newly added user
    user_obj = await getUser(insert_results.results.insertId);
    return user_obj
  } catch (err) {
    throw err;
  }

  // console.log(user);
  // console.log(user.formal_name);
  // console.log(user.preferred_name);
  // console.log(user.unity_id);
  // return db.query('INSERT INTO user (usr_is_admin, usr_formal_name, usr_preferred_name, usr_unity_id) VALUES (0, ?, ?, ?)', [user.formal_name, user.preferred_name, user.unity_id]).catch(function(error){
  //   //console.log('Duplicate user'); 
  //   console.log(error);
  // }).then(()=>{
  //   return db.query('SELECT * FROM user WHERE usr_unity_id = ?;', [user.unity_id]).then(({results}) => {
  //     console.log(results);
  //     return new User(results[0]);
  //   }); 
  // });
}

async function updateUser(user){
  // Must have user id
  try{
    let update_results = await db.query('UPDATE user SET usr_formal_name = ?, usr_preferred_name = ?, usr_unity_id = ?, usr_is_teacher = ?, usr_is_admin = ? WHERE usr_id = ?', [user.formal_name, user.preferred_name, user.unity_id, user.is_teacher, user.is_admin, user.id]);
    if (update_results.results.affectedRows == 0) {
      throw new Error('Error updating user. Make sure to include the user id in the request');
    }
  
    // Return newly added user
    user_obj = await getUser(user.id);
    return user_obj
  } catch (err) {
    throw err;
  }
  }


// Takes user object as input
function deleteUser(user){
  return db.query('DELETE FROM user WHERE usr_unity_id = ?', [user.unity_id], function (err, result) {
    if (err) throw err;
    return result.affectedRows;
  });
}

// // Will make an existing user a teacher, or create a new user as a teacher
// async function setTeacher(user){
//   try {
//     // Check if user already exists
//     let user_obj = await getUserByUnityID(user.unity_id);
//     if (user_obj) {
//       // update user to be teacher
//       let update_results = await db.query('UPDATE user SET usr_is_teacher = 1 WHERE usr_id = ?', [user_obj.id]);
//       if(update_results.results.affectedRows == 0){
//         throw new Error('Error updating user');
//       }
//     } else {
//       let insert_results = await db.query('INSERT INTO user (usr_is_admin, usr_formal_name, usr_preferred_name, usr_unity_id, usr_is_teacher) VALUES (0, ?, ?, ?, 1)', [user.formal_name, user.preferred_name, user.unity_id]);
//       if (insert_results.results.affectedRows == 0) {
//         throw new Error("Error inserting new user");
//       }
//     }

//     // Return newly added user
//     user_obj = await getUser(insert_results.results.insertId);
//     return user_obj
//   } catch(err){
//     throw new Error("Error", err.message);
//   }
// }

module.exports = {
    getUsers : getUsers,
    getUser : getUser,
    getUserByUnityID : getUserByUnityID,
    createUser: createUser,
    deleteUser : deleteUser,
    updateUser: updateUser
  }