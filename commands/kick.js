const { SlashCommandBuilder } = require('discord.js');
const logger = require('../modules/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks user from server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Kick member from server')
                .setRequired(true)
        ),
        
    
        async execute(interaction){
            try {
                const member = interaction.options.getMember('user');
                await member.kick();
                await interaction.reply(`Kicked ${member} from server!`);

            } catch (error) {
                interaction.reply('An error ocured during execution of command!');
                logger.debug(error);
            }
        },
};