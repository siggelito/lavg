
function initPreview (imageSet) {
	

	$("#preview-btn").delay(1000).on("click", function() {
		//ani1(imageSet);
		
		var tl = new TimelineLite();
		
		//for image in slide
			//if iamgeSet.settings == transitionslide
			//transitionSlide(tl, imageSet[i].image, imageSet[i+1].image);
			transSlide(tl, imageSet[0].image, imageSet[1].image);
			
			//if choice == other
		
    });
	
	
	
    $("#preview-button").delay(1000).on("click", function() {
    	var tl = new TimelineLite();
		imageSet = sortSlideShow(imageSet);
    	runSlideShow(imageSet, tl, 0);
    });
}








function runSlideShow(imageSet, timeline, index) {
	
	$(".close").click(function() {
		$(imageSet[index].layers).hide();
	});
	
	if (index == 0) {
		startAnimation(imageSet[0]);
		timeline.add(TweenLite.to(0, imageSet[index].settings.duration, {})); 
	} else {
		imageSet[index].settings.transition(imageSet[index-1], imageSet[index], timeline);
		timeline.add(TweenLite.to(0, imageSet[index].settings.duration, {}));        
	}
	index++;
	
	if (index < imageSet.length) {
		runSlideShow(imageSet, timeline, index);
	} 
	else {
		endAnimation(imageSet[index-1]);
	}
}
