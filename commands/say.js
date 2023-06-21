const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Create you annoucement in the channel that you select')
    .addChannelOption(option => option.setName('channel').setDescription('The channel for your annoucement').addChannelTypes(ChannelType.GuildText).setRequired(true))
    .addStringOption(option => option.setName('text').setDescription('This is the description of the annoucement').setRequired(true)),
    
    async execute(interaction){

      const { options } = interaction

      const channel = options.getChannel('channel')
      const text = options.getString('text')

      await interaction.reply({ content: "Your message has been sent below"})

      await channel.send(text)
    }
}   