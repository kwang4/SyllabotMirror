const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

async function deployCommands(primary_token,application_id)
{
    const token = primary_token
    const clientId = application_id;
    
    const commands = [];
    const folderPath = path.join(__dirname,`/commands`);
        
    //array of command folders to read
    const commandFolders = fs.readdirSync(folderPath);
    for(const folder of commandFolders)
    {
        const commandPath = path.join(folderPath,folder);
        const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(`.js`));
    
        for(const file of commandFiles)
        {
            const filePath = path.join(commandPath,file);
            const command = require(filePath);
            //Set command with key of command name, value of command itself
            if(`data` in command && `execute` in command)
            {
                commands.push(command.data.toJSON())
            }
            else
            {
                console.log(`[WARNING] The command at ${filePath} is missing a 'data' or 'execute' property.`);
            }
        }
    }
    const rest = new REST().setToken(token);
    return await (async () => {
        try {
        console.log("Refreshing slash commands...");   
        const data = await rest.put(Routes.applicationCommands(clientId),{body:commands});
        
    
        console.log(`Successfully reloaded ${data.length} application (/) commands!`);
        return true;
    }
    catch(error){
        console.error(error);
        return false;
    }
    })();
}

module.exports = {
    deployCommands:deployCommands
}


