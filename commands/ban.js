const { SlashCommandBuilder } = require('discord.js');
const logger = require('../modules/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans user from server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Ban member from server')
                .setRequired(true)
        ),
        
    
        async execute(interaction){
            try {
                const member = interaction.options.getMember('user');
                await interaction.guild.members.ban(member)
                await interaction.reply(`Banned ${member} from server!`);

            } catch (error) {
                interaction.reply('An error ocured during execution of command!');
                logger.debug(error);
            }
        },
};