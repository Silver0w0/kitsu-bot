const { SlashCommandBuilder } = require('discord.js')
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('testmodal')
    .setDescription('This command only is a test modal and don´t summit anything'),
    async execute(interaction){

        const modal = new ModalBuilder()
        .setTitle('Test Modal')
        .setCustomId('modal')

        const name = new TextInputBuilder()
        .setCustomId('name')
        .setRequired(true)
        .setLabel('Write your name')
        .setStyle(TextInputStyle.Short)

        const desc = new TextInputBuilder()
        .setCustomId('desc')
        .setRequired(true)
        .setLabel('Write the description')
        .setStyle(TextInputStyle.Paragraph)

        const firstArrow =  new ActionRowBuilder().addComponents(name)
        const secondArrow =  new ActionRowBuilder().addComponents(desc)
        
        modal.addComponents(firstArrow, secondArrow)

        interaction.showModal(modal)

    }
}
