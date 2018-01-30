var users = require('./user-handler.js');
var timer = require('./timer.js');
var weed = require('./420get.js');
module.exports = {
    handle: handle,
    sendmsg: sendmsg
}

function handle(client, message, commands) {
    if (message.author.bot === true) {
        return;
    }
    if (message.content === "!clock") {
        message.channel.send(new Date().toLocaleTimeString().substring(0, 5));
    }
    if (new Date().toLocaleTimeString().substring(0, 5) === "16:20" || new Date().toLocaleTimeString().substring(0, 5)=== "04:20") {
        weed.get(client, message);
    }
    users.adduser(client, message);
    users.givepoints(client, message, 1);
    var line = message.content;
    for (var i = 0; i < commands.length; i++) {

        if (line.includes(' ')) {
            var argstart = line.indexOf(' ') + 1;
            if (line.substring(0, line.indexOf(' ')) == commands[i].name) {
                var arg = line.substr(argstart);
                console.log(arg);
                commands[i].func(client, message, arg);
            }
        }
        else {
            if (line == commands[i].name) {
                console.log(commands[i].name + " spotted");
                commands[i].func(client, message, null);
            }
        }
    }
}

function sendmsg(message, content) {
    message.channel.send(content);
}