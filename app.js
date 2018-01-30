//#region requires
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
var memepics = require('./functions/memepictures.js');
var kps = require('./functions/kps.js');
var youtube = require('./functions/youtube.js');
// var server = require('./server.js');
var league = require('./functions/league.js');
//#endregion
const client = new Discord.Client();
fs.readFile('tokens.json', 'utf8', function callback(err, data) {
    if (err) {
        console.log(err);
    }
    else {
        var parseddata = JSON.parse(data);
        var discordtoken = parseddata.discordtoken;
        console.log("tokens.json data successfully loaded.");
        client.login(discordtoken);
    }
});

client.on('ready', () => {
    console.log('I am ready!');
    users.loadUserDataFromFile();
    memepics.loadImageData();
    // server.start();
});
client.on('message', msg => {
    const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
    const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
    console.log(`${guildTag}${channelTag} ${msg.author.username}#${msg.author.discriminator}: ${msg.content}`);
    messagehandler.handle(client, msg, commands);
    // sheets.trackusers(client, msg);
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
    {name: "!memepic", func: memepics.searchImage},
    {name: "!addmeme", func: memepics.addMeme},
    {name: "!yt", func: youtube.ytSearch},
    {name: "!next", func: youtube.next},
    // {name: "!lolrank", func: league.rank}
    // {name: "!kps", func: kps.addPlayer}

]