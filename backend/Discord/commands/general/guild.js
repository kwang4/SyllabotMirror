const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder().setName(`guild`).setDescription(`Identifies what guild the bot is in`), 
    async execute(interaction) {
        await interaction.reply(`This command was run by **${interaction.user.username}**, who joined **${interaction.guild.name}** on \`\`\`${interaction.member.joinedAt}\`\`\``);
    }
};