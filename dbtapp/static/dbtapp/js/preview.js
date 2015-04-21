
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

    if (current != 0) {
    	imageSet[current].settings.transition(imageSet[current-1].layerOne, imageSet[current].layerOne);
        //transition(imageSet[current-1].canvas, imageSet[current].canvas);
        
    } else {
        $(imageSet[current].layerOne).show();
    }
    current++;

    if (current < imageSet.length) {
        setTimeout(function(){runSlideShow(imageSet, current)}, 1000);
    } else {
        setTimeout(function() {
            $(imageSet[current-1].layerOne).hide();
        }, 1000);
        
    }
    
}

function transition(current, next) {
    $(current).hide();
    $(next).show();
}