const { SlashCommandBuilder } = require('discord.js')

const date = new Date()
module.exports = {
    cooldown: 2,
    data: new SlashCommandBuilder().setName('date').setDescription('Display todays date'),
    async execute(interaction){
        await interaction.reply(`Today's date is ${date}`)
    }
}