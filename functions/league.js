module.exports = {
    rank: searchRankBySummonerName
}
require('dotenv').config();
const API_KEY = process.env.LOL_API_KEY;
const request = require('request');
const Discord = require('discord.js');

function searchRankBySummonerName(client, message, searchTerm) {
    var options = {
        headers: {
            "X-Riot-Token": API_KEY
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