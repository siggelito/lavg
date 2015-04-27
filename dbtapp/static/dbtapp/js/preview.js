
function initPreview (imageSet) {	
	/* Oanvänd funktion!
	var startButton = document.getElementById("start-button");
	
    $(startButton).on("click", function() {
		imageSet = sortSlideShow(imageSet, 0);
    	runSlideShow(imageSet, 0);
    });
	*/

    $("#preview-button").delay(1000).on("click", function() {
		imageSet = sortSlideShow(imageSet);
    	runSlideShow(imageSet, 0);
    });
}

function runSlideShow(imageSet, current) {

    if (current == 0) {
    	startAnimation(imageSet[0]);
    	var logo = document.getElementById('logo-image');
    	if (logo != null) {
    		$(logo).show();
    		logo.style.zIndex = 99999;
    	}; 
    } else {
    	imageSet[current].settings.transition(imageSet[current-1], imageSet[current]);        
    }
    current++;
    if (current < imageSet.length) {
        timer = setTimeout(function(){runSlideShow(imageSet, current)}, imageSet[current].settings.duration);
    } else {
        timer = setTimeout(function() {
        	endAnimation(imageSet[current-1]);
        }, imageSet[current-1].settings.duration);
    }
	
	$(".close").click(function() {
		clearTimeout(timer);
		$(imageSet[current].layers).hide();
	});
}
