const discord = require('discord.js')
const { MessageButton, MessageActionRow } = require("discord-buttons")
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  if(!message.content.startsWith(ayarlar.prefix)) return

    const embed = new discord.MessageEmbed()
    .setTitle("Buton Rol ・Sistemi X izexlesh")
    .setColor("BLUE")
    .setDescription("Aşağıdaki Butona Basıp Rollerinizi Alıp Veya Kaldırabilirsiniz")
    const Video = new MessageButton()
    .setStyle("green")
    .setLabel("Tüm Rolleri Al")
    .setID("VerRolü")
    
     const remove = new MessageButton()
    .setStyle("red")
    .setLabel("Tüm Rolleri Çıkart")
    .setID("AlRolü")


    const row = new MessageActionRow()
    .addComponent([Video, remove, ])


    message.channel.send({component: row, embed: embed})
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: "butonsistemi",
  description: 'abone-sistemi.',
  usage: 'abone-sistemi'
};
