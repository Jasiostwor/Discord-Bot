const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Delete messages from channel')
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete')
                .setRequired(true)
                .setMaxValue(100)  
                .setMinValue(1)              
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
        .setDMPermission(false),
        
    
        async execute(interaction){
            const amount = interaction.options.getNumber('amount');

            await interaction.channel.bulkDelete(amount);

            await interaction.reply(`Deleted ${amount} messages`);        
        },
};