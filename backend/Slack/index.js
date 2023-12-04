const { App } = require('@slack/bolt')
require("dotenv").config();
const APIModule = require('./modules/APIModule');
const LogDAO = require('../src/data/LogDAO.js');
const UserDAO = require('../src/data/UserDAO.js');
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
    
      var values = await OpenAI.getCourseResources(command.team_id);
      var resources = values[0]
      var section = values[1];

      var values2 = await OpenAI.getAIResponse(resources, 1500, command.text);
      var aiResponse = values2[0];
      var fileName = values2[1];

      var values3  = await OpenAI.getResponseMessage(aiResponse, fileName, command.text, command.user_name);
      var responseMessage = values3[0];
      var unfilteredAIResponse = values3[1];

      // Send message back 
      await client.chat.postMessage({
        channel: command.channel_id,
        text: responseMessage
      });

      var userId = await UserDAO.getUserByUnityID(command.user_name);
      await LogDAO.createLog(section.courseID, section.sectionNum, userId.id, command.text, unfilteredAIResponse);
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


