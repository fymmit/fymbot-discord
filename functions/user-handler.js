var fs = require('fs');
module.exports = {
    users: users,
    adduser: adduser,
    listUserInfo: list,
    givepoints: givepoints,
    loadUserDataFromFile: loadUserDataFromFile,
    getUsers: getUsers,
    getPoints: getPoints
}

var users = {
    usertable: [
        {name: 'cuck', points: 0}
    ]
};

function loadUserDataFromFile() {
    fs.readFile('users.json', 'utf8', function callback(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            users = JSON.parse(data);
            console.log("users.json data successfully loaded.");
        }
    });
}

function getPoints(username, callback) {
    var points = 0;
    for (var i = 0; i < users.usertable.length; i++) {
        if (users.usertable[i].name === username) {
            points = users.usertable[i].points;
        }
    }
    callback(points);
}

function getUsers(callback) {
    callback(users)
}

function adduser(client, message) {
    var username = message.author.username;
    var userfound = false;
    for (var i = 0; i < users.usertable.length; i++) {
        var user = users.usertable[i];
        if (user.name === username) {
            console.log("User already in list.");
            userfound = true;
            break;
        }
    }
    if (!userfound) {
        users.usertable.push({name: username, points: 0});
        var json = JSON.stringify(users);
        fs.writeFile('users.json', json, 'utf8', function callback(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("users.json data written successfully");
            }
        });
    }
}
function list(client, message) {
    console.log("Listing users...");
    var output = "```\n";
    for (var i = 0; i < users.usertable.length; i++) {
        var user = users.usertable[i];
        var userpointsString = user.name + ": " + user.points + "\n";
        console.log(userpointsString);
        output += userpointsString;
    }
    output += "```";
    console.log("...end of list.");
    message.channel.send(output);
}
function givepoints(client, message, amount = 1) {
    var num = parseInt(amount);
    if (!isNaN(num) && isFinite(num)) {
        var username = message.author.username;
        for (var i = 0; i < users.usertable.length; i++) {
            if (users.usertable[i].name === username) {
                users.usertable[i].points += num;
                var json = JSON.stringify(users);
                fs.writeFile('users.json', json, 'utf8', function callback(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("users.json data written successfully");
                    }
                });
                break;
            }
        }
    }
}