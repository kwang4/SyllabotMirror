const OpenAIApi = require("openai");
//Tells dotenv to search starting in the backend root folder
require('dotenv').config({ path: require('path').join(process.cwd(), '.env') });

// Creating an instance of OpenAIApi with API key from the environment variables
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
});

async function askQuestion(question_content) {

  //var results = ResourceDAO.getCourseFiles();

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { "role": "system", "content": "You are an instructor at NC State University aiming to provide helpful answers to student questions. Answer as concisely as possible"},
      { "role": "user", "content": question_content }
    ],
    model: 'gpt-3.5-turbo',
  });

  //console.log(chatCompletion.choices[0]);
  return chatCompletion.choices[0].message.content;

}

module.exports = {
  askQuestion: askQuestion
}
