const { SlashCommandBuilder } = require('discord.js');
const { Hangman } = require('discord-gamecord')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('hangman')
  .setDescription('Play Hangman game'),
  async execute(interaction) {
    const Game = new Hangman({
      message: interaction,
      embed: {
        title: 'Hangman',
        color: '#5865F2'
      },
      hangman: {hat: "🎩", head: "😟", shirt: "👕", pants: "🩳", boots: "👞👞"},
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