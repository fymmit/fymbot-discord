var msghandler = require('./message-handler.js');
module.exports = {
    timer: timer,
    timerEnd: timerEnd
}

function timer(client, message, param) {
    if (param !== null) {
        if (param.includes(' ')) {
            var alertTextStart = param.indexOf(' ') + 1;
            var timeunits = param.substring(0, param.indexOf(' '));
            var alertText = param.substr(alertTextStart);
        } else {
            var timeunits = param;
            var alertText = "";
        }
        var num = parseInt(timeunits) * 1000;
        console.log("timer() called with: " + num);
        var data = {message: message, alertText: alertText};
        if (!isNaN(num) && isFinite(num)) {
            setTimeout(timerEnd, num, data);
        }
    } else {
        console.log("timer() called with null, dont");
    }
    //     var startTime = Date.now();
    //     var endTime = num * 1000 + startTime;
    //     var timerDone = false;
    //     while (!timerDone) {
    //         if (Date.now() >= endTime) {
    //             timerDone = true;
    //             callback(message, num + " timer done, " + message.author);
    //         }
    //     }
    // }
}
function timerEnd(data) {
    data.message.channel.send(data.message.author + " " + data.alertText);
}