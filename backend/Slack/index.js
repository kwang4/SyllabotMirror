const { App } = require('@slack/bolt')
require("dotenv").config();

function createApp(data) { 
  const app = new App({
    token: data.SLACK_TOKEN,
    signingSecret: data.SIGNING_SECRET,
    socketMode: true,
    appToken: data.SOCKET_TOKEN,
  
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
    var responseMessage = `Q: \"${command.text}\" asked by <@${command.user_name}>\nA: This is the answer to your question!`
  
    // Send message back 
    await client.chat.postMessage({
      channel: command.channel_id,
      text: responseMessage
    });
  });
}

module.exports = {
  createSlackApp: createApp
}


