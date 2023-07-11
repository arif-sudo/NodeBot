const { default: axios } = require('axios');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

const { apikeygif } = require('../../config.json')

const data = new SlashCommandBuilder()
    .setName('gif')
    .setDescription('gif maker')
    .addStringOption(option =>
        option
            .setName('string')
            .setDescription('The input')
            .setRequired(true)
            .setAutocomplete(true));
    
//
module.exports = {
    data: data,
    async execute(interaction) {
        const gifInput = interaction.options.getString('string');
        console.log(gifInput)
        const response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${apikeygif}&tag=${gifInput}&rating=g`);
        const gifurl = response.data.data.url ?? "https://giphy.com/gifs/movie-tomska-asdf6-CWOaf2u5dZ30I"
        await interaction.reply({ content: `${gifurl}`, ephemeral: true })
    },
}