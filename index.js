// Config
require('dotenv').config();

// Node native modules
const fs = require('node:fs');
const path = require('node:path');

// Necessary discord.js classe
const { Client, Collection, GatewayIntentBits } = require('discord.js');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Put all commands found in collection inside client
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if('data' in command && 'execute' in command){
		client.commands.set(command.data.name, command);
	}
}


// Handling interactions
const eventPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

for(const file of eventFiles){
	const filePath = path.join(eventPath, file);
	const event = require(filePath);

	if (event.once){
		client.once(event.name, (...args) => event.execute(...args));
	}else{
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN);