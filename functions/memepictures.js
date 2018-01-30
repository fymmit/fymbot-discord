var Discord = require('discord.js');
var fs = require('fs');
var download = require('download-file');

module.exports = {
    searchImage: searchImage,
    images: images,
    getImages: getImages,
    addImage: addImage,
    loadImageData: loadImageData,
    getImageByFilename: getImageByFilename,
    addTags: addTags,
    addMeme: discordAddImage
}

var imagepath = 'public/memepictures';


var images = [
    {filename: 'stupid_ape.jpg', tags: [
        'meme', 'stupid_ape', 'stupid', 'ape', 'you_die_now'
    ]},
    {filename: 'toaster.jpg', tags: [
        'cute', 'toaster', 'comic'
    ]},
    {filename: 'moki.gif', tags: [
        'cute', 'sexy', 'muuki', 'niklas', 'toki', 'slurping'
    ]},
    {filename: '50shadesofazer.png', tags: [
        'azer', 'multiple_faces', 'sexy', 'osu!'
    ]},
    {filename: 'thinking.jpg', tags: [
        'thinking', 'anime', 'thinking_face'
    ]}
]

function loadImageData() {
    fs.readFile('public/memepictures/images.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            images = JSON.parse(data);
            console.log("images.json data successfully loaded.");
        }
    })
}

function getImageByFilename(filename, callback) {
    for (var i = 0; i < images.length; i++) {
        if (images[i].filename === filename) {
            console.log("löyty " + filename);
            callback(images[i]);
            return;
        }
    }
}

function addTags(tags, filename) {
    var splitTags = tags.split(" ");
    for (var i = 0; i < images.length; i++) {
        if (images[i].filename === filename) {
            for (var j = 0; j < splitTags.length; j++) {
                images[i].tags.push(splitTags[j]);
            }
            break;
        }
    }
    var json = JSON.stringify(images);
    fs.writeFile('public/memepictures/images.json', json, 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("images.json data successfully written");
        }
    })
}

function getImages(callback) {
    callback(images)
}

function discordAddImage(client, message, tagstring) {
    var tags = tagstring.split(" ");
    // console.log("korkeus: " + message.attachment.height);
    var attachments = Array.from(message.attachments.values());
    if (attachments.length !== 0 && attachments[0].height !== undefined) {
        var filename = attachments[0].filename;
        var url = attachments[0].url;
        console.log(url);
        var image = {filename, tags};
        console.log("Image spotted. Doing things now...");
        download(url, {
            directory: "./public/memepictures/",
            filename: filename
        }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("memepic saved.");
                addImage(image);
            }
        })
        message.channel.send("memepic added");
    }
    else {
        message.channel.send("ei ollu kuva");
    }
}

function addImage(image) {
    images.push(image);
    var json = JSON.stringify(images);
    fs.writeFile('public/memepictures/images.json', json, 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("images.json data successfully written");
        }
    })
}

function searchImage(client, message, param) {
    console.log("aluks: " + param);
    if (param === null) {
        var random = Math.floor((Math.random() * images.length-1) + 1);
        console.log(random);
        sendImage(message, images[random].filename);
    }
    else {
        var searchTags = param.split(" ");
        console.log("splitted:" + searchTags)
        var matchingImages = [];
        for (var j = 0; j < images.length; j++) {
            var tagsFound = 0;
            for (var i = 0; i < searchTags.length; i++) {
                for (var k = 0; k < images[j].tags.length; k++) {
                    if (searchTags[i] === images[j].tags[k]) {
                        tagsFound++;
                        if (tagsFound === searchTags.length) {
                            matchingImages.push(images[j].filename);
                            break;
                        }
                    }
                }
            }
        }

        if (matchingImages.length !== 0) {
            console.log("matches: " + matchingImages);
            var random = Math.floor((Math.random() * matchingImages.length-1) + 1);
            sendImage(message, matchingImages[random], param);
        } else {
            message.channel.send('eipä ollu');
        }
    }
}

function sendImage(message, filename, param = "") {
    console.log(`${imagepath}/${filename}`);
    var attachment = new Discord.Attachment(`${imagepath}/${filename}`);
    message.channel.send(`${message.author.username}: ${param}`, attachment);
}