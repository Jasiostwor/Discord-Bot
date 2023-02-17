const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const logger = require('../modules/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Delete messages from channel')
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete')
                .setRequired(true)
                .setMaxValue(100)                
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .setDMPermission(false),
        
    
        async execute(interaction){
            if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)){
                try {
                    /*empty*/
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
                await interaction.reply('You do not have permissions to delete messages!');
            }           
        },
};