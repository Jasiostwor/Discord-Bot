const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
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
            const member = interaction.options.getMember('user');

            if (member.permissions.has(PermissionsBitField.Flags.KickMembers)){
                try {
                    await interaction.guild.members.ban(member)
                    await interaction.reply(`Banned ${member} from server!`);
    
                } catch (error) {
                    interaction.reply('An error ocured during execution of command!');
                    logger.debug(error);
                }
            }else{
                await interaction.reply("You do not have permissions to ban users!")
            }
           
        },
};