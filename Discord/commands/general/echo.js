const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName(`echo`).setDescription(`Echo's what you said`), 
    async execute(interaction) {
        await interaction.reply(interaction.options.getString("input"));
    }
};