const { Events } = require('discord.js')

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(c){
        console.log(`Client is ready, and logged in as ${c.user.tag} `)
    }
}
