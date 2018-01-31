const YTSearch = require('youtube-api-search');
const API_KEY = 'AIzaSyBw0xLneR_TzZn-WOGHgf04XpW6cVd75ww';

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
    x = (x + 1 < lastSearch.length) ? x + 1 : 0;
    message.channel.send(`https://www.youtube.com/watch?v=${lastSearch[x].id.videoId}`);
}

module.exports = {
    ytSearch: videoSearch,
    next: next
}