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
