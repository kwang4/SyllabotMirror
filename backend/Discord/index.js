const { Client, Events, GatewayIntentBits, ActivityType } = require('discord.js');
// require("dotenv").config();
// const token = process.env.DISCORD_TOKEN;


class DiscordBot {
    constructor(p_token) {
        // Create a new client instance
        this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
        this.commandHandler = require('./utils/commandHandler.js');
        this.token = p_token;

        this.client.once(Events.ClientReady, c => {
            console.log(`Logged in as ${c.user.tag}`);
            this.client.user.setPresence({
                activities: [{ name: `discord js v.14`, type: ActivityType.Playing }], 
                status: "online",
            });
        });

        process.on('SIGTERM', () => {
            Promise.all([
                this.client.destroy(),
                process.exit(),
            ]);
            console.log("Bot exited");
        });

        process.on('SIGINT', async () => {
            await Promise.all([
                this.client.destroy(),
                process.exit()
            ]);
        });

        this.client.on(Events.InteractionCreate,async interaction => {
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
        this.botStartup(); // Corrected the function call
    }

    async botStartup() {
        try {
            await this.client.login(this.token);
        } catch (error) {
            console.log("Invalid discord token");
        }
        // Load commands if logged in properly
        this.commandHandler.loadJsCommands(this.client);
    }
}

module.exports = {
    DiscordBot: DiscordBot
};
