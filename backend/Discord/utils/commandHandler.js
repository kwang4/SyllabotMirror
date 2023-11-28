const fs = require(`node:fs`);
const path = require(`node:path`);
const {Collection} = require(`discord.js`);
exports.loadJsCommands = (client) => {

    client.commands = new Collection();
    const folderPath = path.join(__dirname,`../commands`);
    
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
                client.commands.set(command.data.name,command);
               // console.log(`Read ${command.data.name}`);
            }
            else
            {
                console.log(`[WARNING] The command at ${filePath} is missing a 'data' or 'execute' property.`);
            }
        }
    }

    console.log("Loaded js commands");
};