module.exports = {
    uptime: uptime
}

function uptime(client, message) {
    var t = client.uptime;
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    message.channel.send(days +
         ":" + hours +
          ":" + minutes +
           ":" + seconds + " (d:h:m:s)");
}