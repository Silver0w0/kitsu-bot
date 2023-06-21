// Clases necesarias de discord.js
const fs = require('node:fs')
const path =require('node:path')
const {Client, Events, GatewayIntentBits, Collection} = require('discord.js')
const { token } = require('./kitsu.json')
const mongoose = require('mongoose')
const bwelcome = require('./bwelcome.js')

// Acceso a la base de datos
const mongodbURL = 'mongodb+srv://silver:dgqgFtV0RS7GUIJ9@kitsu-bot.d0rpgur.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongodbURL || '',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

if (mongoose.connect){
  console.log('Base de datos iniciada.')
}
else{
  console.log('Fallo en el acceso a la DB.')
}

// Creamos un nuevo cliente instaciado
const client = new Client({ intents: [GatewayIntentBits.Guilds]})

// Añadimos los comandos creados en el archivo principal
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles){
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  // Establecemos un nuevo objeto en la colección con la key como nombre del comando y el valor como el modulo exportado
  if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Usamos 'c' como parametro del evento para separarlo de nuestra variable 'cliente'
client.once(Events.ClientReady, c => {
  let cache = client.channels.cache.get('1120648090723029012')
	console.log(`LISTOOO! Iniciado ${c.user.tag} kyaaa!`);
  console.log(cache)

  bwelcome(client)

});

// Creamos los eventos intinerados
client.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isChatInputCommand())return
  
  const command = interaction.client.commands.get(interaction.commandName)

  if(!command){
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    await command.execute(interaction)
  } catch(error){
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
})


//welcome
const welcome = require('./schemas.js/welcomeSchema')
client.on(Events.GuildMemberAdd, async member => {
  const data = await welcome.findOne({ Guild: member.guild.id})
  if(!data) return
  else{
    const channel = await member.guild.channels.cache.get(data.channel)
    const msg = await channel.send({ content: `${data.Message.replace('{member}', member).replace('{members}', member.user.username)}`}).catch(err => {})
    try {
      await msg.react(data.Reaction)
    } catch(e){
      return
    }
  }
})

// Iniciamos sesión con nuestro token de Discord
client.login(token)