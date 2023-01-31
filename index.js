// Config
const { token } = require("dotenv").config()

// Node native modules
const fs = require('node:fs')
const path = require('node:path')

// Necessary discord.js classe
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js")


const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// Put all commands found in collection inside client
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command)
    }
}


// Handling interactions
client.on(Events.InteractionCreate, async interaction =>{
    if(!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if(!command){
        console.error(`No command matching ${interaction.commandName} was found.`)
        return
    }

    try{
        await command.execute(interaction)
    }catch(error){
        console.error(error)
        await interaction.reply({ content: 'Wystąpił błąd podczas wykonywania komendy!', ephemeral: true})
    }
})




client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(process.env.TOKEN)