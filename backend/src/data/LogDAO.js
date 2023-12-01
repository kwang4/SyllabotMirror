const db = require('./DBConnection');
const Log = require('./models/Log');
const UserDAO = require('./UserDAO.js');

function getLogs(sec_number, sec_crs_id) {
  return db.query('SELECT * FROM conversation JOIN question ON qst_id = con_qst_id WHERE con_sec_number = ? AND con_sec_crs_id = ?', [sec_number, sec_crs_id]).then(({ results }) => {
    return results.map(log => new Log(log));
  })
}

async function createLog(sec_crs_id, sec_number, usr_id, qst_question, qst_response) {
  var questionResults = await createQuestion(qst_question, qst_response);
  //console.log("questionResults: ", questionResults);
  await createConversation(usr_id, sec_number, sec_crs_id, questionResults);
  return await getLog(sec_number, sec_crs_id, questionResults);
}

async function getUserLog(unityID){
  const user = await UserDAO.getUserByUnityID(unityID);
  return db.query('SELECT * FROM conversation JOIN question ON qst_id = con_qst_id WHERE con_usr_id = ?', user.id).then(({results}) => {
    return results.map(log => new Log(log));
  })
}

// async function createQuestion(qst_question, qst_response) {
//    db.query('INSERT INTO question (qst_question, qst_response) VALUES (?, ?)', [qst_question, qst_response]).then(({error, results}) => {
//     if (error) {
//     } else {
//       console.log("Results.insertId: ", results.insertId);
//       return results.insertId;
//     }
//   });
// }

function createQuestion(qst_question, qst_response) {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO question (qst_question, qst_response) VALUES (?, ?)', [qst_question, qst_response])
      .then(({ error, results }) => {
        if (error) {
          reject(error);
        } else {
          //console.log("Results.insertId: ", results.insertId);
          resolve(results.insertId);
        }
      })
      .catch(reject);
  });
}

function getLog(sec_number, sec_crs_id, qst_id) {
  return db.query('SELECT * FROM conversation JOIN question ON qst_id = con_qst_id WHERE con_sec_number = ? AND con_sec_crs_id = ? AND qst_id = ?', [sec_number, sec_crs_id, qst_id]).then(({ results }) => {
    return results.map(log => new Log(log));
  })
}

function createConversation(usr_id, sec_num, sec_crs_id, qst_id) {
  db.query('INSERT INTO conversation (con_usr_id, con_sec_number, con_sec_crs_id, con_qst_id) VALUES (?, ?, ?, ?)', [usr_id, sec_num, sec_crs_id, qst_id]).then(({error, results}) => {
    if (error) {
    } else {
      return results;
    }
  });
}

module.exports = {
    getLogs: getLogs,
    createLog: createLog,
    getUserLog, getUserLog
  }