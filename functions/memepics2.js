var request = require('request');

let url = 'https://photos.timblo.us/'

function meme(client, message) {
    request.get(`${url}images`, (err, res, body) => {
        if (!err) {
            let images = JSON.parse(body);
            let random = Math.floor((Math.random() * images.length));
            let randomImage = images[random]
            message.channel.send(`${url}${randomImage.name}`);
        }
    })
}

module.exports = {
    meme
}