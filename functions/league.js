module.exports = {
    rank: searchRankBySummonerName
}
const request = require('request');
const Discord = require('discord.js');

function searchRankBySummonerName(client, message, searchTerm) {
    var options = {
        headers: {
            "X-Riot-Token": "RGAPI-9d2334c4-686b-4ea1-9c02-8835c0e2571e"
        }
    }
    request(`https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${searchTerm}`, options, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            var data = JSON.parse(body);
            var summonerId = data.id;
            var summonerName = data.name;
            console.log(summonerId);
            console.log(data);
            request(`https://euw1.api.riotgames.com/lol/league/v3/positions/by-summoner/${summonerId}`, options, (err, res, body) => {
                if (!err && res.statusCode === 200) {
                    var data = JSON.parse(body);
                    console.log(data);
                    var rankdata = (data.length !== 0)
                        ? {
                            title: summonerName,
                            description: `Win/Loss: ${data[0].wins}/${data[0].losses}, ${data[0].tier} ${data[0].rank} ${data[0].leaguePoints} LP`
                        }
                        : {
                            title: summonerName,
                            description: 'Unranked'
                        }
                    var embed = new Discord.RichEmbed(rankdata);
                    message.channel.send(embed);
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
}