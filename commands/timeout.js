const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const logger = require('../modules/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout an user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Ban member from server')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option.setName('time')
                .setDescription('Time in minutes')
                .setRequired(true)
                .addChoices(
                    {name:'1min', value: 60000},
                    {name:'5min', value: 300000},
                    {name:'15min', value: 900000},
                    {name:'30min', value: 1800000},
                    {name:'1h', value: 3600000},
                    {name:'3h', value: 10800000},
                    {name:'5h', value: 18000000},
                    {name:'10h', value: 36000000},
                    {name:'24h', value: 86400000},
                    {name:'7d', value: 604800000},
                    {name:'14d', value: 1209600000},
                    {name:'28d', value: 2419200000},
                )
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers)
        .setDMPermission(false),
        
    
        async execute(interaction){
            if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)){
                try {
                    const member = interaction.options.getMember('user');
                    let time = interaction.options.getNumber('time') ?? 30000;

                    await member.timeout(time);

                    await interaction.reply(`Timeouted ${member}`);
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
                await interaction.reply('You do not have permissions to timeout users!');
            }           
        },
};