const YTSearch = require('youtube-api-search');
require('dotenv').config();
const API_KEY = process.env.YOUTUBE_API_KEY;

var lastSearch = [];
var x = 0;

function videoSearch(client, message, term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
        if (!videos || videos.length === 0) {
            return;
        }
        lastSearch = videos;
        x = 0;
        message.channel.send(`https://www.youtube.com/watch?v=${videos[0].id.videoId}`);
    });
}

function next(client, message) {
    if (lastSearch.length === 0) {
        return;
    }
    x = (x + 1 < lastSearch.length) ? x + 1 : 0;
    message.channel.send(`https://www.youtube.com/watch?v=${lastSearch[x].id.videoId}`);
}

module.exports = {
    ytSearch: videoSearch,
    next: next
}