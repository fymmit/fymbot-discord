module.exports = {
    fakeOnlineCheck: fakeOnlineCheck
}
var SteamAPI = require('steamapi');

// fs.readFile('tokens.json', 'utf8', function callback(err, data) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         var parseddata = JSON.parse(data);
//         var steamtoken = parseddata.steamtoken;
//         console.log("tokens.json data successfully loaded.");
//         client.login(discordtoken);
//     }
// });
const steam = new SteamAPI('2B717B0962629AF5397522D19926E2D6');

var memers = [
    {nick: "luzik", steamid: "76561198155254438", fakeOnline: false},
    {nick: "Muuki", steamid: "76561198033698779", fakeOnline: false},
    {nick: "molko", steamid: "76561198155254438", fakeOnline: false}
]

function fakeOnlineCheck(guildMember) {
    var ch = guildMember.guild.channels.find('name', 'alfashitpost');
    for (var i = 0; i < memers.length; i++) {
        if (guildMember.user.username === memers[i].nick && guildMember.presence.status == 'online' && memers[i].fakeOnline == false) {
            steam.getUserSummary(memers[i].steamid).then(profile => {
                if (profile.personaState === 4) {
                    console.log("fakeonline1");
                    memers[i].fakeOnline = true;
                    ch.send(guildMember.user.username + " fake onliner");
                    setTimeout(function resetFakeOnlineStatus(memer) {
                        console.log("fakeonline2");
                        memer.fakeOnline = false;
                    }, 3600000, memers[i]);
                }
            })
        }
    }
}