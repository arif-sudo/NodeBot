const { Events, Collection } = require('discord.js');


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName); //one command at a time; client.commands have all the aviable commands 


            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            //Cooldown 
            const { cooldowns } = interaction.client;

            if (!cooldowns.has(command.data.name)) {
                cooldowns.set(command.data.name, new Collection()); // setting cooldown [->38], 
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name);//  key/value pair of triggered command
            const defaultCooldownDuration = 5;
            const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;// 15 sec
            // console.log('[*]',command.cooldown)

            if (timestamps.has(interaction.user.id)) {
                // console.log('[*]',cooldowns)
                // console.log('[*]',timestamps)
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                if (now < expirationTime) {
                    const expiredTimestamp = Math.round(expirationTime / 1000);
                    return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
                }
            }
            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                await command.execute(interaction);
            }
            catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }
        } else if (interaction.isStringSelectMenu()) {

            try {
                const [input] = interaction.values
                if (interaction.customId === 'starter' || interaction.customId === 'drinks') {
                    interaction.reply(input)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
