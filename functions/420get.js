var users = require('./user-handler.js');
module.exports = {
    get: get
}

var getters = [

];

var emptyGettersCalled = false;
function get(client, message) {
    if (!emptyGettersCalled) {
        setTimeout(function emptyGetters() {
            getters = [];
            emptyGettersCalled = false;
            console.log("getters table is now empty.");
        }, 120000);
        emptyGettersCalled = true;
    }
    var found = false;
    for (var i = 0; i < getters.length; i++) {
        if (getters[i] === message.author.username) {
            found = true;
            console.log(getters[i] + " already gettered");
            break;
        }
    }
    if (!found) {
        console.log("420 getted");
        users.givepoints(client, message, 1000);
        message.channel.send("Nice 420 get, " + message.author.username + ". You were awarded 1000 points.");
        getters.push(message.author.username);
    }
}