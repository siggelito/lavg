var page = require('webpage').create();
/*    system = require('system'),
    url;

url = system.args[1];
var page = require('webpage').create();*/
page.onError = function (msg, trace) {
    console.log(msg);
    trace.forEach(function(item) {
        console.log('  ', item.file, ':', item.line);
    });
};
//page.viewportSize = { width: 640, height: 480 };
page.open("http://stackoverflow.com/questions/20906305/import-error-cannot-import-name-execute-manager-in-windows-environment", function  () {
setTimeout( function () {

    for (var i = 0; i < 100; i++) {
        page.render("/dev/stdout", {format: "png"});
    }
    phantom.exit();
}, 1000)});




/*page.onError = function (msg, trace) {
	console.log(msg);
	trace.forEach(function(item) {
		console.log('  ', item.file, ':', item.line);
	});
};
page.onResourceReceived = function(resource) {
	if (resource.url == url) {
		status_code = resource.status;
	}
};*/

/*
if (system.args.length < 3 || system.args.length > 5) {
    console.log('Usage: customizedRender URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    console.log('  image (png/jpg output) examples: "1920px" entire page, window width 1920px');
    console.log('                                   "800px*600px" window, clipped to 800x600');
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
    page.viewportSize = { width: 600, height: 600 };
    if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
        size = system.args[3].split('*');
        page.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                                           : { format: system.args[3], orientation: 'portrait', margin: '1cm' };
    } else if (system.args.length > 3 && system.args[3].substr(-2) === "px") {
        size = system.args[3].split('*');
        if (size.length === 2) {
            pageWidth = parseInt(size[0], 10);
            pageHeight = parseInt(size[1], 10);
            page.viewportSize = { width: pageWidth, height: pageHeight };
            page.clipRect = { top: 0, left: 0, width: pageWidth, height: pageHeight };
        } else {
            console.log("size:", system.args[3]);
            pageWidth = parseInt(system.args[3], 10);
            pageHeight = parseInt(pageWidth * 3/4, 10);
            console.log ("pageHeight:",pageHeight);
            page.viewportSize = { width: pageWidth, height: pageHeight };
        }
    }
    if (system.args.length > 4) {
        page.zoomFactor = system.args[4];
    }
    page.open('http://www.catgifpage.com/', function (status) {
        if (status !== 'success') {
	    console.log('Unable to load the adress!');
	    phantom.exit(1);
	} else {
		window.setTimeout(function () {
		page.render("/dev/stdout", {format: "png"});
		//phantom.exit();
		}, 25);
	}
    });
}
*/