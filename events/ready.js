const { Events } = require('discord.js');
const logger = require('./../modules/logger');

module.exports = {
    name: Events.ClientReady,
	once: true,
	execute(client) {
		logger.info(`Ready! Logged in as ${client.user.tag}`);
		// console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};