var first = true;
var timeline = null;

function initPreview (imageSet) {

	timeline = new TimelineMax();
	initControls(timeline);
	var previewButton = document.getElementById("preview-button");
	if (previewButton == null) {
		$("#preview").css("opacity", "1");
		runSlideShow((imageSet), timeline);
		
	} else {
		runSlideShow((imageSet), timeline);
	}
	
	$("#pause").html("<span class='glyphicon glyphicon-pause'></span>");
	$("#pause").unbind("click");
	$("#pause").on("click", function() {
		if (!timeline.paused()) {
			timeline.pause();
			$(this).html("<span class='glyphicon glyphicon-play'></span>");
		}
		else{
			timeline.play();
			$(this).html("<span class='glyphicon glyphicon-pause'></span>");
		}
	});
	$("#repeat").unbind("click");
	$("#repeat").on("click", function() {
		/*timeline.delete();*/
		/*timeline.reset();*/
		timeline.restart();
		timeline.clear();
		timeline.kill();
		timeline = null;
		//imageSet = null;
		initializeVideo();

           //alert($('.color-box').css('background-color'));
		
		//runSlideShow(sortSlideShow(imageSet), timeline);

		//runSlideShow((video), timeline);

	});
	
/*	$("#repeat").delay(1000).on("click", function() {
		timeline.restart();
		$("#pause").html("<span class='glyphicon glyphicon-pause'></span>");
    });*/
	$("#preview-button").unbind("click");
	$("#preview-button").delay(1000).on("click", function() {

		$("#preview").css("opacity", "1");
		timeline.restart();
		timeline.clear();
		timeline.kill();
		timeline = null;
		//imageSet = null;
		initializeVideo();
		//runSlideShow((video), timeline);
    });
	
	$("#closeButton").on("click", function() {
		timeline.pause();
		$("#preview").css("opacity", "0");
	});
}


