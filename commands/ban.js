const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans user from server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Ban member from server')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Ban reason')    
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
        .setDMPermission(false),
        
    
        async execute(interaction){

            const member = interaction.options.getMember('user');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';

            await interaction.guild.members.ban(member,{reason: reason});
            await interaction.reply(`Banned ${member} from server!`);

        },
};