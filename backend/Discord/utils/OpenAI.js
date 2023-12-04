const OpenAIApi = require("openai");
//Tells dotenv to search starting in the backend root folder
const ResourceDAO = require ("../../src/data/ResourceDAO");
const SectionDAO = require ("../../src/data/SectionDAO");
const fs = require('fs');
require('dotenv').config({ path: require('path').join(process.cwd(), '.env') });

// Creating an instance of OpenAIApi with API key from the environment letiables
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
});

async function askQuestion(question_content) {

  //let results = ResourceDAO.getCourseFiles();

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { "role": "system", "content": `Roleplay with you being a teacher in this course and me being a student. 
      You want to be helpful and provide a short and concise, but accurate answer. Answer solely based off the information you have at your disposal in the prompt.
      If the answer can not be found in the information provided, respond with the exact string in all uppercase: 'NOT AVAILABLE'.`},
      { "role": "user", "content": question_content }
    ],
    model: 'gpt-3.5-turbo', temperature: 0
  });

  console.log(chatCompletion);
  return chatCompletion.choices[0].message.content;

}

async function getCourseResources(guild_id){
  let server_id = guild_id;
  let deploy = await ResourceDAO.getDeployByServer(server_id);
  let section = await SectionDAO.getSectionByDeploy(deploy.deployID);
  let resources = await ResourceDAO.getCourseFiles(section.sectionNum, section.courseID);

  return [resources, section];
}

async function getAIResponse(resources, batch_size, question){
      let filePath;
      let aiResponse = "";
      let fileName = "Not Found";

      for (const file of resources) {
        let tempPrompt = "The information you have at your disposal is this:\n";

        filePath = file.fil_parsed_link;
        let tempText = fs.readFileSync(filePath, "utf8");
        let script_tokens  = tempText.split(" ");
        for(let i = 0; i < (script_tokens.length / batch_size); i++){
          tempPrompt = "The information you have at your disposal is this:\n";
          let before_context = "";
          if((i * batch_size) >= batch_size){
            before_context = script_tokens.slice((i * batch_size)-Math.floor(batch_size/5), i * batch_size).join(" ");
          }
          let content = script_tokens.slice((i * batch_size), (i * batch_size) + batch_size).join(" ");
          let after_context = "";
          if((i * batch_size + batch_size) < script_tokens.length){
            after_context = script_tokens.slice((i * batch_size) + batch_size, ((i * batch_size) + batch_size) + Math.floor(batch_size/5)).join(" ");
          }
          let full_context = before_context + " " + content + " " + after_context;
          full_context = full_context.trim();

          tempPrompt = tempPrompt + full_context;

          tempPrompt = tempPrompt + "\nMy question is: ";
          tempPrompt = tempPrompt + question;
  
          tempPrompt = tempPrompt + `\nIf the answer can not be found in the information provided, respond with the exact string in all uppercase: 'NOT AVAILABLE'.`;

          try {
            console.log(tempPrompt);
            aiResponse = await askQuestion(tempPrompt);
          }
          catch (error) {
            aiResponse = "RATE LIMIT ERROR";
          }

          if(!aiResponse.includes("NOT AVAILABLE")){
            fileName = file.fil_name;
            break;
          }
        }

        if(!aiResponse.includes("NOT AVAILABLE")){
          fileName = file.fil_name;
          break;
        }
      }

      return [aiResponse, fileName];
}

async function getResponseMessage(aiResponse, fileName, question, userName){
  if(aiResponse.includes("NOT AVAILABLE")){
    aiResponse = "I could not find the answer to your question in the given resources for this course.\nI recommend asking an instructor when they are available if you still need the answer to this question.";
  }
  if(aiResponse.includes("RATE LIMIT ERROR")){
    aiResponse = "Sorry! I am getting too many messages at this current time and cannot answer this question.\nPlease try to ask your question again in a minute.";
  }
  let unfilteredAIResponse = aiResponse;
  aiResponse = `*${aiResponse}*`;
  aiResponse = aiResponse.replaceAll("\n", "*\n*");
  aiResponse = aiResponse.replaceAll("**", "");
  console.log(aiResponse);
  let responseMessage = `Q: \"${question}\" asked by @${userName}\nYour response is: \n${aiResponse}\nThis information was found in the file \"${fileName}\"\n`;
  return [responseMessage, unfilteredAIResponse];
}

module.exports = {
  askQuestion: askQuestion,
  getCourseResources: getCourseResources,
  getAIResponse: getAIResponse,
  getResponseMessage: getResponseMessage
}
