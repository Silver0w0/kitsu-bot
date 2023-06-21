const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const translate = require('@iamtraction/google-translate')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('translate')
  .setDescription('Translator')
  .addStringOption(option => option.setName('text').setDescription('What do you want to translate?').setRequired(true))
  .addStringOption(option => option.setName('lang').setDescription('The language you want to translate to').addChoices(
    { name: 'English', value: 'en'},
    { name: 'Spanish', value: 'es'},
    { name: 'Latin', value: 'la'},
    { name: 'French', value: 'fr'},
    { name: 'German', value: 'de'},
    { name: 'Italian', value: 'it'},
    { name: 'Portuguese', value: 'pt'},
    { name: 'Greek', value: 'gl'},
    { name: 'Russian', value: 'ru'},
    { name: 'Japanese', value: 'jp'},
    { name: 'Arabic', value: 'ar'},
  ).setRequired(true)),

  async execute(interaction){
    
    const { options } = interaction
    const text = options.getString('text')
    const lan = options.getString('lang')

    await interaction.reply({ content: `Translating your language...`, ephemeral: true})

    const applied = await translate(text, { to: `${lan}`})

    const embed = new EmbedBuilder()
    .setColor('Blue')
    .setTitle('Translate Succesful')
    .addFields({name: 'Old text:', value: `\`\`\`${text}\`\`\``, inline: false})
    .addFields({name: 'Translated text:', value: `\`\`\`${applied.text}\`\`\``, inline: false})

    await interaction.editReply({ content: ``, embeds: [embed], ephemeral: true})
  }

}