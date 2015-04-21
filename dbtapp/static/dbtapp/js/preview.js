function initPreview (imageSet) {
	var startButton = document.getElementById("start-button");
    $(startButton).on("click", function() {
    	runSlideShow(imageSet, 0);
    });
}

function runSlideShow(imageSet, current) {
    if (current != 0) {
        transition(imageSet[current-1].canvas, imageSet[current].canvas);
        
    } else {
        $(imageSet[current].canvas).show();
    }
    current++;

    if (current < imageSet.length) {
        setTimeout(function(){runSlideShow(imageSet, current)}, 1000);
    } else {
        setTimeout(function() {
            $(imageSet[current-1].canvas).hide();
        }, 1000);
        
    }
    
}

function transition(current, next) {
    $(current).hide();
    $(next).show();
}