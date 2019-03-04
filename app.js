var fs = require('fs');
var Discord = require('discord.js');
var think = require('./functions/think.js');
var moro = require('./functions/moro.js');
var messagehandler = require('./functions/message-handler.js');
var uptime = require('./functions/uptime.js');
var users = require('./functions/user-handler.js');
var points = require('./functions/points-handler.js');
var timer = require('./functions/timer.js');
var steam = require('./functions/steam.js');
var twitch = require('./functions/twitchStreamInfo.js');
var memepics = require('./functions/memepics2.js');
var kps = require('./functions/kps.js');
var youtube = require('./functions/youtube.js');
// var league = require('./functions/league.js');
require('dotenv').config();
const client = new Discord.Client();

client.login(process.env.DISCORD_API_KEY);

client.on('ready', () => {
    console.log('I am ready!');
    users.loadUserDataFromFile();
});
client.on('message', msg => {
    const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
    const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
    console.log(`${guildTag}${channelTag} ${msg.author.username}#${msg.author.discriminator}: ${msg.content}`);
    messagehandler.handle(client, msg, commands);
});
client.on('presenceUpdate', (oldMember, newMember) => {
    steam.fakeOnlineCheck(newMember);
});
client.on('emojiDelete', emoji => {
    var ch = emoji.guild.channels.find('name', 'alfashitpost');
    ch.send(emoji.name + " emoji was deleted! OMF");
    console.log(emoji + " was deleted");
});
client.on('messageReactionAdd', (msgReaction, user) => {
    msgReaction.message.react(msgReaction.emoji);
});

var commands = [
    {name: "!moro", func: moro.moro},
    {name: "!think", func: think.think},
    {name: "!uptime", func: uptime.uptime},
    {name: "!points", func: users.listUserInfo},
    // {name: "!givepoints", func: users.givepoints},
    {name: "!fymer", func: timer.timer},
    {name: "!twitch", func: twitch.channelData},
    {name: "!memepic", func: memepics.meme},
    // {name: "!addmeme", func: memepics.addMeme},
    {name: "!yt", func: youtube.ytSearch},
    {name: "!next", func: youtube.next},
    // {name: "!lolrank", func: league.rank}
    // {name: "!kps", func: kps.addPlayer}

]