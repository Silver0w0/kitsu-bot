const { SlashCommandBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle, ChannelType} = require('discord.js')
const { createTranscript } = require('discord-html-transcripts')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('transcript')
  .setDescription('Transcript the specified channel')
  .addChannelOption(option => option.setName('channel').setDescription('The chanll will be transcripted').addChannelTypes(ChannelType.GuildAnnouncement, ChannelType.GuildText, ChannelType.AnnouncementThread, ChannelType.PublicThread, ChannelType.PrivateThread).setRequired(true))
  .addIntegerOption(option => option.setName('limit').setDescription('The limit oof transcripted messages').setRequired(true).setMinValue(1).setMaxValue(1000000)),

  async execute (interaction, client) {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: `You don´t have perms to use this command`, ephemeral: true})

    let channel = interaction.options.getChannel('channel')
    let limit = interaction.options.getInteger('limit')

    await interaction.reply({ content: `Your transcript is being loaded this may take a few minutes`, ephemeral: true})

    const file = await createTranscript (channel, {
      limit: limit,
      returnBuffer: false,
      filename: `${channel.name.toLowerCase()}-transcript.html`
    })

    let cache = client.channels.cache.get('1120648090723029012') 
    let msg = await cache.send({ files: [file]})

    const button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel('Open')
      .setURL(`https://mahto.id/chat-exporter?url=${msg.attachment.first()?.url}`)
      .setStyle(ButtonStyle.Link),

      new ButtonBuilder()
      .setLabel('Download')
      .setURL(`${msg.attachment.first()?.url}`)
      .setStyle(ButtonStyle.Link),
    )

    const embed = new EmbedBuilder()
    .setColor('Aqua')
    .setDescription(`Your transcript for ${channel} is ready with a limit of ${limit}`)

    await interaction.editReply({ embeds: [embed], content:``, components: [button], ephemeral: true})
  }
}