const { SlashCommandBuilder } = require("discord.js");

module.exports= {
  data: new SlashCommandBuilder()
    .setName('namemc')
    .setDescription('Get the NameMC URL of the selected user, or your own ')
    .addStringOption(option => option.setName('player').setDescription('Take the nickname of the player that you want show').setMaxLength(20).setRequired(true)),
  async execute(interaction) {
    const nick = interaction.options.getString('player')
    await interaction.reply(`https://namemc.com/profile/${nick}`)
  }
}
