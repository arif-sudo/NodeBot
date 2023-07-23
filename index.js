const { Client } = require('discord.js');
const { GatewayIntentBits } = require('discord.js')
const { Collection } = require('discord.js')

const { token } = require('./config.json')
const fs = require('fs');
const path = require('path');

const ready = require('./events/ready')
const cronJob = require('./cronjob')

// Client start
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Collections
client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');//commands
const commandFolders = fs.readdirSync(foldersPath);//[ other, ping ]

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);//[commands/other, commands/ping ]
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));//[ ping.js ]
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file); //commands/ping/ping.js
		console.log('[<-- File Path is -->]', filePath)
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command)
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
//Client end

//Events start

const eventPath = path.join(__dirname,'events');
const eventFiles =  fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles){
	const filePath = path.join(eventPath, file);
	console.log('[<--Event file path is -->]', filePath)
	const event = require(filePath);
	if(event.once){ //if event.once is set to true execute client.once else client.on
		client.once(event.name, (...args) => event.execute(...args))
	}
	else {
		client.on(event.name, (...args) => event.execute(...args))
	}
}

//Events end





client.login(token);
