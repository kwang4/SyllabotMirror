const express = require('express');

const apirouter = require('./APIRoutes.js');
const app = express();
PORT = process.env.PORT;
app.use(express.json());
app.use(apirouter)

const Slack = require('./../Slack/index.js');

const DeployDAO = require('./data/DeployDAO.js');


app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
  })
      

if(PORT == null)
  PORT = 80;
// As our server to listen for incoming connections
app.listen(PORT, async () => {
  console.log(`Server listening on port: ${PORT}`);

  // Get all deploys
  let deploys = await DeployDAO.getDeploys();

  for (deploy of deploys) {
    console.log(deploy);
    if (deploy.typeID == 1) {
      try {
        DeployDAO.createSlackBot(deploy.primary_token, deploy.secondary_token, deploy.socket_token);
      }
      catch (error) {
        console.log(error);
      }
    }
    else if (deploy.typeID == 2) {
      console.log("Discord bot");
    }
  }

});

module.exports = {app:app}