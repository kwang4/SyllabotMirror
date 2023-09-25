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

// Response to messages that contain hello
app.message('hello', async ({message, say}) => {
  await say(`Hello <@${message.user}>!`);
})

app.command('/ask', async({command, ack, say}) => {
  try {
    ack();
    // Perform an API call
    //console.log(JSON.stringify(command))
    await say(`Q: ${command.text}\n\nA: This is the answer to your question!`)
  } catch(e) {
    try {
      console.log(`Error 1: ${e}`)
      await say("There was an error sending your message, please try again");
    } catch(e) {
      console.log(`Error 2: ${e}`)
    }
  }
});
