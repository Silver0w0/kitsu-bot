const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('annoucement')
    .setDescription('Create you annoucement in the channel that you select')
    .addChannelOption(option => option.setName('channel').setDescription('The channel for your annoucement').addChannelTypes(ChannelType.GuildText).setRequired(true))
    .addStringOption(option => option.setName('title').setDescription('This is the title of the annoucement').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('This is the description of the annoucement').setRequired(true))
    .addStringOption(option => option.setName('image').setDescription('This is the image of the annoucement').setRequired(false)),
    
    async execute(interaction){

      const { options } = interaction

      const channel = options.getChannel('channel')
      const title = options.getString('title')
      const description = options.getString('description')
      const image = options.getString('image')

      if (image) {
        if(!image.startsWith('http')) return await interaction.reply({ content: "You cannot make this your image. You image must start with http", ephemeral: true})
      }

      const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setImage(image)
      .setColor('Blue')


      await interaction.reply({ content: "Your annoucement has been sent below"})

      await channel.send({embeds: [embed]})
    }
}   