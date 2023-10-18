const { SlashCommandBuilder, REST } = require('discord.js');
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder().setName(`joke`).setDescription(`Gets a random joke`), 
    async execute(interaction) {
        const rest = new REST();
        const response = await axios.get('https://icanhazdadjoke.com',{
            headers:{'Accept':'text/plain'}
        });
        const respText = response.data;
        await interaction.reply(respText ? respText : "Stock Joke");
    }
};