var page = require('webpage').create(),
    system = require('system'),
    url;

url = system.args[1];
var page = require('webpage').create();
page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
};
page.open(url, function  () {
	setTimeout( function () {
		var totalTime = page.evaluate( function () {
			return timeline.totalDuration();
		});
		var currentTime = 0;
		var frames = totalTime * 60;
		var frameStep = 1 / 60;
		for (var i = 0; i < frames; i++) {
			currentTime = frameStep * i;
			page.evaluate( function (currentTime) {
				timeline.pause(currentTime);
			}, currentTime);
			page.render("/dev/stdout", {format: "png"});
		}
		
		phantom.exit();
		
	}, 1000)});