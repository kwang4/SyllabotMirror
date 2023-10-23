const db = require('./DBConnection')
const Deploy = require('./models/Deploy')

// This returns all Syllabot instances
function getDeploys() {
  return db.query('SELECT * FROM deploy').then(({ results }) => {
    return results.map(deploy => new Deploy(deploy));
  })
}

module.exports = {
  getDeploys: getDeploys
}