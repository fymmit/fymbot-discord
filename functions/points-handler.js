var userhandler = require('./user-handler.js');

module.exports = {
    givepoints: givepoints
}

function givepoints(client, message, amount) {
    var username = message.author.username;
    for (var i = 0; i < userhandler.users.table.length; i++) {
        if (users.table[i].name === username) {
            users.table[i].points += amount;
            break;
        }
    }
}