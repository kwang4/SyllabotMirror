const db = require('./DBConnection');
const Log = require('./models/Log');

function getLogs(sec_number, sec_crs_id) {
  return db.query('SELECT * FROM conversation JOIN question ON qst_id = con_qst_id WHERE con_sec_number = ? AND con_sec_crs_id = ?', [sec_number, sec_crs_id]).then(({ results }) => {
    return results.map(log => new Log(log));
  })
}

function createLog(sec_crs_id, sec_number, usr_id, qst_question, qst_response) {
  console.log("Reached create log");
  createQuestion(qst_question, qst_response);
  // return db.query('INSERT INTO section (sec_crs_id, sec_number) VALUES (?, ?);', [sec_crs_id, sec_number], function (err, result) {
  //   if (err) throw err;
  //   return result.affectedRows;
  // });
}

function createQuestion(qst_question, qst_response) {
  console.log("Reached create question");
   db.query('INSERT INTO question (qst_question, qst_response) VALUES (?, ?);', [qst_question, qst_response], (error, results, fields) => {
    if (error) {
    } else {
      console.log("Last inserted ID:", results.insertId);
      return results.insertId;
    }
  });
}

module.exports = {
    getLogs: getLogs,
    createLog: createLog
  }