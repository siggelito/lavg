
function initPreview (imageSet) {
	var startButton = document.getElementById("start-button");
	var previewButton = document.getElementById("show-preview-button");
	
    $(startButton).on("click", function() {
    	runSlideShow(imageSet, 0);
    });

    $(previewButton).delay(1000).on("click", function() {
    	runSlideShow(imageSet, 0);
    });
}

function runSlideShow(imageSet, current) {

    if (current == 0) {
    	startAnimation(imageSet[0])

    } else {
    	imageSet[current].settings.transition(imageSet[current-1].layerOne, imageSet[current].layerOne);        
    }
    current++;

    if (current < imageSet.length) {
        setTimeout(function(){runSlideShow(imageSet, current)}, imageSet[current].settings.duration);
    } else {
        setTimeout(function() {
        	endAnimation(imageSet[current-1]);
        }, imageSet[current-1].settings.duration);
        
    }
    
}