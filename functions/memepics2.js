var request = require('request');

let url = 'https://photos.timblo.us/'

function meme(client, message, tagstring) {
    const tags = tagstring ? tagstring.split(' ') : null
    request.get(`${url}images`, (err, res, body) => {
        if (!err) {
            let images = JSON.parse(body);
            const filteredImages = !tags ? images : images.filter(image => {
                const imageTags = image.tags.split(' ')
                for (tag of tags) {
                    if (imageTags.indexOf(tag) === -1) {
                        return false;
                    }
                }
                return true;
            })
            let random = Math.floor((Math.random() * filteredImages.length));
            let randomImage = filteredImages[random]
            message.channel.send(`${url}${randomImage.name}`);
        }
    })
}

module.exports = {
    meme
}