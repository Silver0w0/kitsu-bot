const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('rm-bg')
  .setDescription('Remove a background from an image')
  .addAttachmentOption(option => option.setName('image').setDescription('The image you want to remove the bg of').setRequired(true)),

  async execute(interaction){
    await interaction.deferReply({ ephemeral: true})

    const image = interaction.options.getAttachment('image')

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'GgYg5LjLB6pBqhSvW2VA9qQ3',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        image_url: image.proxyURL,
        size: 'auto'
      })
    })

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const attachment = new AttachmentBuilder(buffer, {name: 'removebg.png'})

    const embed = new EmbedBuilder()
    .setColor('Blurple')
    .setTitle('Removed your images Background')
    .setImage('attachment://removebg.png')

    await interaction.editReply({embeds: [embed], files: [attachment], ephemeral: true})
  }
}