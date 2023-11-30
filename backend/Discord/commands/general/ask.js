const { SlashCommandBuilder } = require('discord.js');
const OpenAI = require('../../utils/OpenAI');

module.exports = {
    data: new SlashCommandBuilder().setName(`ask`).setDescription(`Ask Syllabot course questions`).addStringOption(option=>
        option.setName('input').setDescription('Question string').setRequired(true)
    ), 
    async execute(interaction) {
        let msg = interaction.options.getString(`input`);
        await interaction.deferReply();
        let aiResponse = await OpenAI.askQuestion(msg);

        await interaction.editReply(`${aiResponse}`);
    }
};