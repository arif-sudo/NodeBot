const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 15,
	data: new SlashCommandBuilder()
		.setName('pingg').setDescription('Replies with Pop!'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		// await interaction.deferReply();
		// await wait(4000);
		await interaction.reply('Pop!');
		// await interaction.followUp('Pop again!')
		// await interaction.followUp('Pop again and again!')
		// await interaction.followUp('Pop again and again and again!')
		// await interaction.deleteReply();
		// await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`);
	},
};