const users = require('./user-handler.js');

function gamble(client, message, param) {
    if (param == null) param = 0;
    var bet = parseInt(param);
    if (!isNaN(bet) && isFinite(bet)) {
        console.log('bet: ', bet);
        users.getPoints(message.author.username, points => {
            if (points < bet || bet == 0) {
                bet = points;
            }
            var rnd = Math.random();
            var net = (rnd > 0.5) ? bet : -bet;
            if (net < 0) {
                message.channel.send(`${message.author.username} lost ${bet} points.`);
            } else {
                message.channel.send(`${message.author.username} won ${bet} points.`);
            }
            users.givepoints(client, message, net);
        })
    }
}

module.exports = {
    gamble: gamble
}