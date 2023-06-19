const { SlashCommandBuilder } = require("discord.js");

module.exports= {
  data: new SlashCommandBuilder()
    .setName('ig')
    .setDescription('Get the Instagram URL of the selected user, or your own ')
    .addStringOption(option => option.setName('user').setDescription('Take the username of the account that you want show').setMaxLength(30).setRequired(true)),
  async execute(interaction) {
    const nick = interaction.options.getString('user')
    await interaction.reply(`https://www.instagram.com/${nick}`)
  }
}
