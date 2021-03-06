const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const { Client, Util } = require("discord.js");
require("./util/eventLoader.js")(client);
const fs = require("fs");
const logs = require('discord-logs');
logs(client);
const { Database } = require('nukleon');
const db = new Database("plasmic.json");
const ms = require("ms")
var prefix = ayarlar.prefix;
//main dosyamızın bu kısmına bir tanımlama yapmamız gerek
//

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
client.on("message", async message => {
let kontrol = db.fetch(`başvurukanal_${message.guild.id}`)
if(!kontrol) return
if(message.channel.id !== kontrol) return
if(message.channel.id == kontrol) {
let log = db.fetch(`başvurulog_${message.guild.id}`)
if(!log) return
if(message.author.bot == true) return
message.delete()
db.set(`başvurdu_${message.guild.id}.${message.author.id}`, message.content)
message.author.send('Başvurunuz yetkililere iletilmiştir!')
const embed = new Discord.MessageEmbed()
.setTitle(message.author.username + " kişisinin başvurusu")
.setDescription("`" + message.content + "`" + `\n \n **__BAŞVURAN BİLGİLERİ__** \n \n Discord isim ve etiketi: ${message.author.tag} \n İd: ${message.author.id} \n \n **Onaylamak için: !başvuru-onay ${message.author.id}** \n \n **Reddetmek için: !başvuru-red ${message.author.id}**`)
client.channels.cache.get(log).send(embed)
}
})