const { SlashCommandBuilder } = require("discord.js");

module.exports= {
  data: new SlashCommandBuilder()
    .setName('yt')
    .setDescription('Get the YouTube URL of the selected user, or your own ')
    .addStringOption(option => option.setName('user').setDescription('Take the @username of the account that you want show').setMaxLength(60).setRequired(true)),
  async execute(interaction) {
    const nick = interaction.options.getString('user')
    await interaction.reply(`https://www.youtube.com/@${nick}`)
  }
}
