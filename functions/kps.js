module.exports = {
    addPlayer: addPlayer
}

var userhandler = require('./user-handler.js');

var players = [
    {name: null},
    {name: null}
]

function addPlayer(client, message, bet) {
    bet = parseInt(bet);
    console.log(typeof bet);
    if (!isNaN(bet) || isFinite(bet)) {
        console.log("ebin");
        userhandler.getPoints(message.author.username, (points) => {
            if (bet > points) {
                bet = points;
            }
        });
    } else {
        message.channel.send("nope");
        return;
    }
    if (players[0].name === null) {
        players.push(message.author.username);
        message.channel.send(`${message.author.username} is ready to play. Bet = ${bet}`);
    }
}