const discord = require('discord.js');
const { Database } = require('nukleon');
const db = new Database("plasmic.json");
exports.run = async(client, message, args) => {
const embed = new discord.MessageEmbed()
.setTitle(':book:  Başvuru Yardım Menüsü  :book:')
.setDescription(`:envelope:  !başvuru-kanal ayarla/sıfırla = Başvuru kanal ayarlar/sıfırlarsınız \n \n :envelope:  !başvuru-rol ayarla/sıfırla = Başvuru rol ayarlar/sıfırlarsınız \n \n :envelope:  !başvuru-yetkili ayarla/sıfırla = Başvuru yetkili ayarlar/sıfırlarsınız \n \n :envelope:  !başvuru-log ayarla/sıfırla = Başvuru log ayarlar/sıfırlarsınız \n \n :envelope:  !başvuru-onay <id> = Başvuru onaylarsınız \n \n :envelope:  !başvuru-red <id> = Başvuru reddedersiniz`)
return message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel:0,
    aliases: []
    }
    exports.help = {
    name: "yardım"
    }