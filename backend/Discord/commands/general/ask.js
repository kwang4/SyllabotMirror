const { SlashCommandBuilder } = require('discord.js');
const OpenAI = require('../../utils/OpenAI.js');
const LogDAO = require('../../../src/data/LogDAO.js');
const UserDAO = require('../../../src/data/UserDAO.js');
const { response } = require('express');
module.exports = {
    data: new SlashCommandBuilder().setName(`ask`).setDescription(`Ask Syllabot course questions`).addStringOption(option=>
        option.setName('input').setDescription('Question string').setRequired(true)
    ), 
    async execute(interaction) {
        let msg = interaction.options.getString(`input`);
        await interaction.deferReply();
       // console.log("GUILD: " +interaction.guild.id);
        let fileData = await OpenAI.getCourseResources(interaction.guild.id);
        let resources = fileData[0];
        let section = fileData[1];

        let responseObj = await OpenAI.getAIResponse(resources, 1500, msg);
        let aiResponse = responseObj[0];
        let fileName = responseObj[1];
  
       let refinedResponseObj  = await OpenAI.getResponseMessage(aiResponse, fileName, msg, interaction.user.username);
       let responseMessage = refinedResponseObj[0];
       let unfilteredAIResponse = refinedResponseObj[1];
        await interaction.editReply(`${responseMessage}`);
       let userId = await UserDAO.getUserByUnityID(interaction.member.nickname);
       await LogDAO.createLog(section.courseID, section.sectionNum, userId.id, msg, unfilteredAIResponse);
    }
};

