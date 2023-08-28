const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
require("dotenv").config();
const token = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages] });
const commandHandler = require('./utils/commandHandler.js');

client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
    client.user.setPresence({
        activities:[{ name:`discord js v.14`,type:ActivityType.Playing }], status:"online",
    });
});

process.on('SIGTERM', () => {
    Promise.all([
        client.destroy(),
        process.exit(),
    ]);
    console.log("Bot exited");
});

process.on('SIGINT', async () => {
    Promise.all([
        client.destroy(),
        process.exit()
    ])
});

client.on(Events.InteractionCreate,async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
    
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

});

client.login(token);
commandHandler.loadJsCommands(client);