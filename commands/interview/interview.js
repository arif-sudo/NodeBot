const { SlashCommandBuilder } = require('discord.js')
const qa = require('./data.js')

//BANNIG
// const data = new SlashCommandBuilder()
//     .setName('ban')
//     .setDescription('Select a member and ban them.')
//     .addUserOption(option =>
//         option
//             .setName('target')
//             .setDescription('The member to ban')
//             .setRequired(true))
//     .addStringOption(option =>
//         option
//             .setName('reason')
//             .setDescription('The reason for banning'))
//     .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
//     .setDMPermission(false);
//await interaction.reply(`Banning ${target.username} for reason: ${reason}`);
//await interaction.guild.members.ban(target);

const data = new SlashCommandBuilder()
    .setName('interview')
    .setDescription('Random qusetion')

module.exports = {
    data: data,
    async execute(interaction) {
        const randomNumber = Math.floor(Math.random() * 15)
        const reply = Object.keys(qa)[randomNumber]
        await interaction.reply(reply)
    }
} 