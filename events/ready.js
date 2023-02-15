const { Events, ActivityType } = require('discord.js');
const logger = require('./../modules/logger');

module.exports = {
    name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setActivity("Banning guild members", {type: ActivityType.Competing});
		client.user.setStatus('dnd');

		
		logger.info(`Ready! Logged in as ${client.user.tag}`);
	},
};