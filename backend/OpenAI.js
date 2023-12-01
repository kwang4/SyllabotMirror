const OpenAIApi = require("openai");
const ResourceDAO = require ("./src/data/ResourceDAO");
require("dotenv").config();

// Creating an instance of OpenAIApi with API key from the environment variables
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
});

async function askQuestion(question_content) {

  //var results = ResourceDAO.getCourseFiles();

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { "role": "system", "content": `Roleplay with you being a teacher in this course and me being a student. 
      You want to be helpful and provide a short and concise, but accurate answer.
      If the answer can not be found in the information provided, respond with the exact string in all uppercase: 'NOT AVAILABLE'.`},
      { "role": "user", "content": question_content }
    ],
    model: 'gpt-3.5-turbo', temperature: 0
  });

  console.log(chatCompletion);
  return chatCompletion.choices[0].message.content;

}

module.exports = {
  askQuestion: askQuestion
}
