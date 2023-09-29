const { App } = require('@slack/bolt')
require("dotenv").config();

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SOCKET_TOKEN,

  port: process.env.PORT || 3000
});

(async () => {
  await app.start();

  console.log('App is running');
})();

app.command('/ask', async({command, ack, client}) => {

  // Need to add try/catch error handling scenarios, but this is good skeleton
  // Reworked from using built in say/respond functions to using client

  // The parameter is what prevents user message from being deleted
  await ack({response_type: 'in_channel'});

  // TODO Make API call to get response

  //console.log(JSON.stringify(command))
  var responseMessage = `This is the answer to your question!`

  // Send message back 
  await client.chat.postMessage({
    channel: command.channel_id,
    text: responseMessage
  });
});
