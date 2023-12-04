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
      console.log("Discord bot: " + deploy.secondary_token);
      try
      {
        DeployDAO.createDiscordBot(deploy.primary_token,deploy.secondary_token);
      }
      catch(error)
      {
        console.log("Invalid login");
      }
    }
  }
  // try
  // {
  //   DeployDAO.createDiscordBot('MTE0Mzk0MDgyMDU2Nzg1NTE0NQ.GAFg3k.8DUS4Bxm2bsfw4Pff7Ji2Ep8AlVah8J-dIR1RQ');
  //   DeployDAO.createDiscordBot('MTE3ODcyMDM5MzkwNTg0NDMxNQ.GPGlm7.Z2NKJenoSSR-mpf2IAHvrS3qDwea5QxKCTLlzA');
  // }
  // catch(error)
  // {
  //   console.log(error);
  // }

});

module.exports = {app:app}