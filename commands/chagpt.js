const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {Configuration, OpenAIApi} = require('openai')
const { execute } = require('./hangman')

const configuration = new Configuration({
  apikey: ""
})

const openai = new OpenAIApi(configuration)

module.exports = {
  data: new SlashCommandBuilder()
  .setName('chatgpt')
  .setDescription('Ask chatgpt a question')
  .addStringOption(option => option.setName('question').setDescription('This is going to be the question for chatpt').setRequired(true))
  .setDMPermission(false),
  async execute (interaction) {
    await interaction.deferReply()

    const question = interaction.options.getString('question')

    try {
      const res = await openai.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 2048,
        temperature: 0.5,
        prompt: question
      })

      const embed = new EmbedBuilder()
      .setColor('blue')
      .setDescription(`\`\`\`${res.data.choices}\`\`\``)

      await interaction.editReply({ embed: [embed] })
    }
    catch(e){
      return await interaction.editReply({content: `Request failed with status code **${e.response.status}**`, ephemeral: true})
    }
  }
}
  
