const OpenAIApi = require("openai");
require("dotenv").config();

// Creating an instance of OpenAIApi with API key from the environment variables
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
});

async function startupAI(question_content) {

  // Setting values for the prompt and message to be used in the GPT-3.5-Turbo
  const GPT35TurboMessage = [
    { role: "system", content: `You are an instructor at NC State University helping students out by answering their course related questions.` },
    {
      role: "user",
      content: "Tell a joke",
    }
  ];

  let GPT35Turbo = async (message) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: message,
    });

    return response.data.choices[0].message.content;
  };

  var setupResponse = await GPT35Turbo(GPT35TurboMessage);

  // Log the generated text from the GPT-3 and GPT-3.5-Turbo models to the console
  console.log(`### I'm GPT-3.5-TURBO. #### ${setupResponse}`);

}

async function askQuestion(question_content) {
  openai.api_key = process.env.OPENAI_API_KEY;
  // Send a 'Completion' API request
  const prompt = question_content;
  const requestOptions = {
    prompt,
    temperature: 0.5,
    max_tokens: 10,
    n: 1,
    stream: false,
    stop: "n",
  };

  openai.completions
    .create(requestOptions)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
  }

module.exports = {
  askQuestion: askQuestion,
  startupAI: startupAI
}
