const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const logger = require('../modules/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks user from server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Kick member from server')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Kick reason')
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
        .setDMPermission(false),
        
    
        async execute(interaction){            
            if(interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)){
                try {
                    const member = interaction.options.getMember('user');
                    const reason = interaction.options.getString('reason') ?? 'No reason provided';

                    await member.kick(reason);
                    await interaction.reply(`Kicked ${member} from server!`);
    
                } catch (error) {
                    if( error.message === 'Missing Permissions'){
                        await interaction.reply('I do not have permissions to do this!');
                    }else{
                        await interaction.reply('An error ocured during execution of command!');
                    }

                    logger.warn(error);
                    logger.file.warn(error);
                }
            }else{
                await interaction.reply('You do not have permission to kick users!');
            }            
        },
};