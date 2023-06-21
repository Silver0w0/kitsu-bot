module.exports = client => {

  client.on('guildMemberAdd', member => {
    const channelID = '1120930648077639760'
    console.log(member)
    const message = `**Welcome to this test server <@${member.id}>**`
    
    const channel = member.guild.channels.cache.get(channelID)
    
    channel.send(message)

    const dmMsg = `Welcome to *Kitsu test server* ${member}`

    member.send(dmMsg).catch(err => {
      return
    })
  })
}