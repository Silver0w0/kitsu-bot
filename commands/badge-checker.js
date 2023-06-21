const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('badge-checker')
  .setDescription('Check who has rare badges within your server')
  .addStringOption(option => option.setName('badge').setDescription('The rare badge to index').addChoices(
    { name: "Staff", value: "Staff" },
    { name: "Partner", value: "Partner" },
    { name: "CertifiedModerator", value: "CertifiedModerator" },
    { name: "Hypesquad", value: "Hypesquad" },
    { name: "Verified Bot", value: "VerifiedBot" },
    { name: "Early Supporter", value: "PremiumEarlySupporter" },
    { name: "Verified Bot Developer", value: "VerifiedDeveloper" },
    { name: "Active Developer", value: "ActiveDeveloper" },
  ).setRequired(true)),
  async execute (interaction) {

    const { options } = interaction
    const check = options.getString('badge')

    await interaction.deferReply({ ephemeral: true })

    let members = []
    await interaction.guild.members.cache.forEach(async member => {
      if (member.user.flags.toArray().includes(check)) members.push(member)
    })

    if (members.length === 0 ) members.push('None')

    try {
      await interaction.editReply({ content: `the people with the **${check}** badge within this server: \n\n> ${members.join('\n> ')}`})
    } catch(e) {
      return await interaction.editReply({ content: `There are **to many** people with the ${check} badge to send`})
    }
  }
}