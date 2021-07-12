const Discord = require('discord.js');

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('<:duyuru:84561716549166869> Buton Rol・Yardım')
.setTimestamp()
.addField('<:okyy:845657252359602186> .butonsistemi', 'Buton Rol Sistemini Kurarsınız',)

.setFooter('🌴 İzexlesh')
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};
