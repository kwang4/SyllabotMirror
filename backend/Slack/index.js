const { App } = require('@slack/bolt')
require("dotenv").config();
const APIModule = require('./modules/APIModule');
const SectionDAO = require('../src/data/SectionDAO.js');
const ResourceDAO = require('../src/data/ResourceDAO.js');
const OpenAI = require('../OpenAI.js');
const fs = require('fs')
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
    
      var server_id = command.team_id;
      var deploy = await ResourceDAO.getDeployByServer(server_id);
      var section = await SectionDAO.getSectionByDeploy(deploy.deployID);
      var resources = await ResourceDAO.getCourseFiles(section.sectionNum, section.courseID);

      console.log(resources);
      //const reader = new FileReader();
      var filePath;
      var aiResponse = "";
      var fileName = "Not Found";
      //var prompt; // STARTING PROMPT
      for (const file of resources) {
        var tempPrompt = "The information you have at your disposal is this:\n";

        filePath = file.fil_parsed_link;
        var tempText = fs.readFileSync(filePath, "utf8");
        tempPrompt = tempPrompt + tempText;

        tempPrompt = tempPrompt + "\nMy question is: ";
        tempPrompt = tempPrompt + command.text;

        //tempPrompt = tempPrompt + `\nIf the answer can not be found in the information provided, respond with the exact string in all uppercase: 'NOT AVAILABLE'.`;

        console.log(tempPrompt);

        aiResponse = await OpenAI.askQuestion(tempPrompt);

        if(!aiResponse.includes("NOT AVAILABLE")){
          fileName = file.fil_name;
          break;
        }
      }
      
      if(aiResponse.includes("NOT AVAILABLE")){
        aiResponse = "I could not find the answer to your question in the given resources for this course.\nI recommend asking an instructor when they are available if you still need the answer to this question.";
      }

      //var responseMessage = `Q: \"${command.text}\" asked by <@${command.user_name}>\nA: This is the answer to your question MODIFIED!`
      //var aiResponse = await OpenAI.askQuestion(command.text);
      aiResponse = `*${aiResponse}*`;
      aiResponse = aiResponse.replaceAll("\n", "*\n*");
      aiResponse = aiResponse.replaceAll("**", "");
      console.log(aiResponse);
      var responseMessage = `Q: \"${command.text}\" asked by <@${command.user_name}>\nYour response is: \n${aiResponse}\nThis information was found in the file \"${fileName}\"\n`
    
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


