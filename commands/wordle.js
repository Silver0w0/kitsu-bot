const { SlashCommandBuilder } = require('discord.js');
const { Wordle } = require('discord-gamecord')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('wordle')
  .setDescription('Play wordle game'),
  async execute (interaction) {
    const Game = new Wordle({
      menssage: interaction,
      embed: {
        title: 'wordle',
        color: '#5865F2'
      },
      customword: null,
      timeoutTime: 60000,
      timeWords: "all",
      winMessage: "You won! The word was **{word}**",
      loseMessage: "You Lost! The word was **{word}**",
      playerOnlyMessage: "Only {player} can use these buttons",
    })

    Game.startGame()
    Game.on('gameOver', result => {
      return
    })
  }
}