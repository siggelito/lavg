function initPreview (imageSet) {	
	var timeline = new TimelineMax();
	initControls(timeline);
	var timelineInitiated = 0;
	$("#pause").on("click", function() {

		if (timelineInitiated == 0) {
			$("#preview").css("opacity", "1");
			runSlideShow(sortSlideShow(imageSet), timeline);
			timelineInitiated = 1;
			$(this).html("<span class='glyphicon glyphicon-pause'></span>");
		}
		else{
			if (!timeline.paused()) {
				timeline.pause();
				$(this).html("<span class='glyphicon glyphicon-pause'></span>");
			}
			else{
				timeline.play();
				$(this).html("<span class='glyphicon glyphicon-play'></span>");
			}
		}
	});

	$("#repeat").on("click", function() {
		timeline.restart();
	});
	
	
	$("#preview-button").delay(1000).on("click", function() {
		$("#preview").css("opacity", "1");
    	runSlideShow(sortSlideShow(imageSet), timeline);
    });
	
	$("#closeButton").on("click", function() {
		$("#preview").css("opacity", "0");
	});
}


