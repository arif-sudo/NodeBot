const {
    SlashCommandBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
} = require('discord.js')


const data = new SlashCommandBuilder()
    .setName('pokemon')
    .setDescription('Select a pokemon!')

module.exports = {
    data: data,

    async execute(interaction) {
        const select1 = new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder('Make a selection')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Bulbasaur')
                    .setDescription('The dual-type Grass/Poison Seed Pokémon.')
                    .setValue('blubasaur'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Pikachu')
                    .setDescription('The electric-type Thunder Yellow Pokémon.')
                    .setValue('pikachu'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Charmander')
                    .setDescription('The Fire-type Lizard Pokémon.')
                    .setValue('charmander'),
            );
        const select2 = new StringSelectMenuBuilder()
            .setCustomId('drinks')
            .setPlaceholder('Make a selection')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Coke')
                    .setValue('coke'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Bonaqua')
                    .setValue('bonaqua'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Borjomi')
                    .setValue('borjomi'),
            );

        const row1 = new ActionRowBuilder()
            .addComponents(select1)
        const row2 = new ActionRowBuilder()
            .addComponents(select2)

        await interaction.reply({
            content: 'Choose your starter and his drink!',
            components: [row1, row2]
        })

    }
}