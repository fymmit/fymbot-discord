module.exports = {
    rank: searchRankBySummonerName
}
const request = require('request');

function searchRankBySummonerName(client, message, searchTerm) {
    var options = {
        headers: {
            "X-Riot-Token": "RGAPI-e0b1ec21-5d3c-4387-970f-579978952ddb"
        }
    }
    request(`https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${searchTerm}`, options, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            var data = JSON.parse(body);
            var summonerId = data.id;
            var summonerName = data.
            console.log(summonerId);
            console.log(body);
            request(`https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/${summonerId}`, options, (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    console.log(body);
                    var data = JSON.parse(body);
                    message.channel.send(`${searchTerm} Wins: ${data[0].wins}, Losses: ${data[0].losses}, rank: ${data[0].tier} ${data[0].rank}`);
                }
                else {
                    console.log('error:', err);
                    console.log('statusCode:', res.statusCode);
                }
            })
        }
        else {
            console.log(res.statusCode);
        }
    })
    // request('https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/41532307', options, (err, res, body) => {
    //     console.log(body);
    //     var data = JSON.parse(body);
    //     console.log(data);
    //     message.channel.send(data[0].wins);
    // })
}