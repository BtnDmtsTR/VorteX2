const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const db = require ('quick.db');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.on("ready", () => {
  console.log('[------------] VorteX Panel [-------------]');
  console.log(`${client.guilds.cache.size} tane sunucuya hizmet veriyor`);
  console.log(`${client.users.cache.size} kullaniciya hizmet veriyor`);
  console.log(`${client.channels.cache.size} kanala hizmet veriyor`);
  console.log("Prefix: " + ayarlar.prefix);
  console.log("Bot ID'si: " + client.user.id);
  console.log("Bot Isim: " + client.user.username);
  console.log('[------------] VorteX Panel [-------------]');
});


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
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
    } catch (e){
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
    } catch (e){
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
    } catch (e){
      reject(e);
    }
  });
};


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ^^');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'batu') {
    msg.reply('Bremın Benim Sahibime Öyle Söyleme `Abi` Desen Daha İyi Olur Sanki ? ^^');
  }
});

client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("birkaç saniye önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
   var rol = member.guild.roles.get("752820486823739402") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
   var kayıtsız = member.guild.roles.get("732633277101506672") // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
   member.addRole(rol)
   member.removeRole(kayıtsız)
member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen 🚨| Admin İletişime Geç Onlar Sana Yardımcı Olucaktır.')
setTimeout(() => {

        member.removeRole(kayıtsız.id);

}, 1000)

    
   }
        else {

        }  
    });







client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 2) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`⚠️ **Lütfen Büyük Harf Kullanma!**`)
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

client.on('guildMemberAdd', async member => {
  let tag = await db.fetch(`otoTag_${member.guild.id}`)
  let kanal = await db.fetch(`ototagK_${member.guild.id}`)
  if (!tag) return
  member.setNickname(tag.replace('{uye}', member.user.username))
})


client.on("guildCreate", guild => {
let cagatay = new Discord.RichEmbed()

    .setColor("GREEN")
    .setTitle("Sunucuya Eklendim! ")
	.addField("Sunucu Adı:", guild.name)
    .addField("Sunucu İD:", guild.id)
	.addField("Sunucu Sahibi", guild.owner)
	.addField("Sunucudaki Kişi Sayısı:", guild.memberCount);
client.channels.get("753548129625833532").send(cagatay);
});

client.on("guildDelete", guild => {
let cagatay = new Discord.RichEmbed()

    .setColor("RED")
    .setTitle("Sunucudan Çıkartıldım! ")
	.addField("Sunucu Adı:", guild.name)
    .addField("Sunucu İD:", guild.id)
	.addField("Sunucu Sahibi", guild.owner)
	.addField("Sunucudaki Kişi Sayısı:", guild.memberCount);
client.channels.get("753548129625833532").send(cagatay);
});

client.on("guildCreate", guild => {
let cagatay = new Discord.RichEmbed()

    .setColor("GREEN")
    .setTitle("Sunucuya Katıldı ")
	.addField("Kullanıcı Adı:", guild.member.name)
    .addField("Sunucu Adı:", guild.name)
	.addField("Sunucudaki Kişi Sayısı:", guild.memberCount);
client.channels.get("767023636111556618").send(cagatay);
});




client.on("guildDelete", guild => {
let batu = new Discord.RichEmbed()

    .setColor("RED")
    .setTitle("Sunucudan Ayrıldı ")
	.addField("Kullanıcı Adı:", guild.member.name)
    .addField("Sunucu Adı:", guild.name)
	.addField("Sunucudaki Kişi Sayısı:", guild.memberCount);
client.channels.get("767023636111556618").send(batu);
});

client.on("guildMemberAdd", async member => {
  let isim = db.fetch(`otoisim_${member.guild.id}`)
if (!isim) return;
member.setNickname(isim)
})



client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);