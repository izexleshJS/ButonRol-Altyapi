const Discord = require("discord.js");
const client = new Discord.Client();
const disbut = require("discord-buttons");
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Util } = require("discord.js");
const fs = require("fs");
const rss = require('rss-converter');
const db = require("quick.db");
const http = require("http");
const fetch = require("node-fetch");
const express = require("express");
require("./util/eventLoader.js")(client);
const path = require("path");
const snekfetch = require("snekfetch");

/*const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);*/

var sesese = "2";
var prefix = ayarlar.prefix;

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
  if (message.author.id === ayarlar.sahip) permlvl = 4;
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

//-------------- BUTON BAŞLANGIÇ --------------//
require("discord-buttons")(client);
const { MessageButton, MessageActionRow } = require("discord-buttons");

client.on("clickButton", async button => {
  if (button.id == "1") {
    button.defer();
    const embed = new Discord.MessageEmbed()
      .setTitle("Düzgün")
      .setDescription("Tamam, ne yapacağını biliyorsun!")
      .setColor("GREEN");

    const CHANNEL = new MessageButton()
      .setStyle("url")
      .setLabel("Subscribe")
      .setURL("https://www.youtube.com/c/izexlesh");

    button.message.edit({
      embed: embed,
      component: CHANNEL
    });
  }

  if (button.id == "2") {
    button.defer();

    button.channel.send(`${button.clicker.user.tag}, He?`);
  }

  if (button.id == "VerRolü") {
    button.reply.send(`Başarıyla Tüm Rollerin Verildi!`, true);
    const role = button.guild.roles.cache.get("ROL İD");
    const role2 = button.guild.roles.cache.get("ROL İD");
    const role3 = button.guild.roles.cache.get("ROL İD");
    const member = button.clicker.member;
    (await member.roles.add(role)) &&
      member.roles.add(role2) &&
      member.roles.add(role3);
  }

  if (button.id == "AlRolü") {
    button.reply.send(`Başarıyla Tüm Rollerin Alındı!`, true);
    const role = button.guild.roles.cache.get("ROL İD");
    const role2 = button.guild.roles.cache.get("ROL İD");
    const role3 = button.guild.roles.cache.get("ROL İD");
    const member = button.clicker.member;
    (await member.roles.remove(role)) &&
      member.roles.remove(role2) &&
      member.roles.remove(role3);
  }
});

//-------------- BUTON BİTİŞ --------------//
client.login(ayarlar.token);
