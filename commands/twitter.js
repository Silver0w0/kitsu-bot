const { SlashCommandBuilder } = require("discord.js");

module.exports= {
  data: new SlashCommandBuilder()
    .setName('twitter')
    .setDescription('Get the twitter URL of the selected user, or your own ')
    .addStringOption(option => option.setName('user').setDescription('Take the username of the account that you want show').setMaxLength(20).setRequired(true)),
  async execute(interaction) {
    const nick = interaction.options.getString('user')
    await interaction.reply(`https://twitter.com/${nick}`)
  }
}
