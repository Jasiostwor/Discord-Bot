const log = require('../modules/logger');

const errorHandler = async (error, interaction) =>{

    if( error.message === 'Missing Permissions'){
        await interaction.reply('I do not have permissions to do this!');
        log.warn(`Error during execution: ${interaction.commandName}`);
        log.warn(error);
    }else{
        await interaction.reply('An error ocured during execution of command!');
        log.error(`Error during execution: ${interaction.commandName}`);
        log.error(error);
    }
};

module.exports = errorHandler;