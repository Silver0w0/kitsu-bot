const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder() .setName('server') .setDescription('Provides information about the server'),
  async execute(interaction){
    // interaction.guild es el objeto que representa el grupo en el cual se va a ejecutar el comando.
    await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`)
  },
}
