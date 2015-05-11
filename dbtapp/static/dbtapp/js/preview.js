
function initPreview (imageSet) {	
	
    $("#preview-button").delay(1000).on("click", function() {
		imageSet = sortSlideShow(imageSet);
    	runSlideShow(imageSet, 0);
    });
}

var timer = null;

function runSlideShow(imageSet, current) {
	
	$(".close").click(function() {
		$(imageSet[current].layers).hide();
		clearTimeout(timer);
		timer = null;
	});
	
	if (current == 0) {
		startAnimation(imageSet[0]);
	} else {
		imageSet[current].settings.transition(imageSet[current-1], imageSet[current]);        
	}
	current++;
	
	if (current < imageSet.length) {
		if(timer){
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(function(){runSlideShow(imageSet, current)}, imageSet[current].settings.duration);
	} 
	else {
		if(timer){
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(function() {
			endAnimation(imageSet[current-1]);
		}, imageSet[current-1].settings.duration);
	}
}
