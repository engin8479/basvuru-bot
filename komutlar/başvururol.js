const discord = require('discord.js');
const { Database } = require('nukleon');
const db = new Database("plasmic.json");
exports.run = async(client, message, args) => {
    if(args[0] == "ayarla") {
    let kontrol = db.fetch(`başvururol_${message.guild.id}`)
    if(kontrol) return message.channel.send('Başvuru rol zaten ayarlı!')
    if(!kontrol) {
let engin = message.mentions.roles.first()
const embed = new discord.MessageEmbed()
.setTitle('HATA')
.setDescription('Lütfen başvuru rolünü belirtin')
.setFooter(message.author.username)
.setTimestamp()
if(!engin) return message.channel.send(embed)
db.set(`başvururol_${message.guild.id}`, engin.id)
const embedd = new discord.MessageEmbed()
.setTitle('BAŞARILI')
.setDescription(`Başvuru rolü <@&${engin.id}> olarak ayarladım!`)
return message.channel.send(embedd)
    }
    }
    if(args[0] == "sıfırla") {
    let kontrol = db.fetch(`başvururol_${message.guild.id}`)
    if(!kontrol) return message.channel.send('Başvuru rol zaten ayarlı değil!')
    db.remove(`başvururol_${message.guild.id}`)
    return message.channel.send('Başvuru rol sıfırlandı')
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 4,
    aliases: []
    }
    exports.help = {
    name: "başvuru-rol"
    }