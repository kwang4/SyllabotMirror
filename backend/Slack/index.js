const { App } = require('@slack/bolt')
require("dotenv").config();
const  APIModule = require('./modules/APIModule');
const OpenAI = require('../OpenAI.js');
class SlackBot{

  //app;


  constructor(p_token, p_signingSecret, p_appToken){
    this.app = new App({
        token: p_token,
        signingSecret: p_signingSecret,
        socketMode: true,
        appToken: p_appToken,
      
        port: process.env.PORT || 3000
    })

  
    this.app.command('/ask', async({command, ack, client}) => {
  
      // Need to add try/catch error handling scenarios, but this is good skeleton
      // Reworked from using built in say/respond functions to using client
    
      // The parameter is what prevents user message from being deleted
      await ack({response_type: 'in_channel'});
    
      // TODO Make API call to get response
    
      //console.log(JSON.stringify(command))
      //var responseMessage = `Q: \"${command.text}\" asked by <@${command.user_name}>\nA: This is the answer to your question MODIFIED!`
      var aiResponse = await OpenAI.askQuestion(command.text);
      var responseMessage = `Q: \"${command.text}\" asked by <@${command.user_name}>\n Your response is: ${aiResponse}\n`
    
      // Send message back 
      await client.chat.postMessage({
        channel: command.channel_id,
        text: responseMessage
      });
    });

    this.app.command('/apitest', async({command, ack, client}) => {
  
      // Need to add try/catch error handling scenarios, but this is good skeleton
      // Reworked from using built in say/respond functions to using client
    
      // The parameter is what prevents user message from being deleted
      await ack({response_type: 'in_channel'});
    console.log("Pre response");
      let response = await APIModule.get('/shib');
      if(response?.status != 200)
      {
        console.log(response?.status);
        let responseMessage = "Error hitting API";
        await client.chat.postMessage({
          channel: command.channel_id,
          text: responseMessage
        });
        return;
      }
    
      //console.log(JSON.stringify(command))
      let responseMessage = `Q: \"${command.text}\" asked by <@${command.user_name}>\nA: ${response.data}`;
    
      // Send message back 
      await client.chat.postMessage({
        channel: command.channel_id,
        text: responseMessage
      });
    });

    (async () => {
      try{
        await this.app.start();
        console.log('App is running');
      }catch(error){
        console.log(error)
      }   
    })();
  }
}

module.exports = {
  slackBot : SlackBot
}


