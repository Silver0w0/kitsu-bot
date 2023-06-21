const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType} = require('discord.js')
const welcome = require('../schemas.js/welcomeSchema')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('welcome')
  .setDescription('Manage your welcome message system')
  .addSubcommand(command => command.setName('setup').setDescription('Setup your welcome message system').addChannelOption(option => option.setName('channel').setDescription('The channel for your welcome message').addChannelTypes(ChannelType.GuildText).setRequired(true)).addStringOption(option => option.setName('message').setDescription('The message. Use {member} to ping the member, and {membet} to put in their username').setRequired(true)).addStringOption(option => option.setName('reaction').setDescription('The reaction for your welcome message').setRequired(false)))
  .addSubcommand(command => command.setName('disable').setDescription('Disable your welcome message system')),

  async execute(interaction){
    const { options } = interaction
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You don´t have perms to use this system', ephemeral: true})

    const sub = options.getSubcommand()
    const data = await welcome.findOne({ Guild: interaction.guild.id})

    switch (sub){
      case 'setup':
      
      if(data) {
        return await interaction.reply({ content: `It looks like there is already a welcome message setup for this server`, ephemeral: true})
      } else {
        const channel = options.getChannel('channel')
        const message = options.getString('message')
        const reaction = options.getString('reaction')

        await welcome.create({
          Guild: interaction.guild.id,
          Channel: channel.id,
          Message: message,
          Reaction: reaction
        })

        const embed = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`Your Welcome message is now setup. When a member joins the message\`${message}\` will be sent in ${channel}`)

        await interaction.reply({ embeds: [embed], ephemeral: true})
      }

      break

      case 'disable':

      if (!data){
        return await interaction.reply({ content: `It looks like there is NOT a welcome message setup for this server yet`, ephemeral: true})
      } else {
        await welcome.deleteMany({Guild: interaction.guild.id})
        
        const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription('Your Welcome message is now disabled and will no longer be sent')

        
      }
    }
  }
}