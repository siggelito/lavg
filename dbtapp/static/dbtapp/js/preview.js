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
			timeline.paused(!timeline.paused());
		
			if (!timeline.paused()) {
				$(this).html("<span class='glyphicon glyphicon-pause'></span>");
			}
			else{
				$(this).html("<span class='glyphicon glyphicon-play'></span>");
			}
		}
	});
	
	
	$("#preview-button").delay(1000).on("click", function() {
		$("#preview").css("opacity", "1");
    	runSlideShow(sortSlideShow(imageSet), timeline);
    });
	
	$("#closeButton").on("click", function() {
		$("#preview").css("opacity", "0");
	});
}


