const discord = require('discord.js');
const { Database } = require('nukleon');
const db = new Database("plasmic.json");
exports.run = async(client, message, args) => {
    if(!message.member.roles.cache.get(db.fetch(`başvuruyetkili_${message.guild.id}`))) return message.channel.send('Sen başvuru yetkilisi değilsin!')
    let rol = db.fetch(`başvururol_${message.guild.id}`)
if(!rol) return message.channel.send('Başvuru rol ayarlanmamış!')
let engin = args[0]
if(!engin) return message.channel.send('Lütfen başvurusu onaylanacak kişinin idini belirtin!')
let kontrol = db.fetch(`başvurdu_${message.guild.id}.${engin}`)
if(!kontrol) return message.channel.send('Bu kişi hiç başvuru yapmamış!')
client.guilds.cache.get(message.guild.id).members.cache.get(engin).roles.add(rol)
client.users.cache.get(engin).send(`${message.guild.name} sunucusundaki başvurunuz <@${message.author.id}> tarafından onaylandı!`)
const embed = new discord.MessageEmbed()
.setTitle('Başvuru onaylandı')
.setDescription(`<@${engin}> kişisinin başvurusu onaylandı \n \n **__BAŞVURU__** \n \n ${kontrol}`)
return message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel:0,
    aliases: []
    }
    exports.help = {
    name: "başvuru-onay"
    }