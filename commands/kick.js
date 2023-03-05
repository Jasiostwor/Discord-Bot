const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

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

            const member = interaction.options.getMember('user');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';

            await member.kick(reason);
            await interaction.reply(`Kicked ${member} from server!`); 

        },
};