function simpleTransition(current, next) {
    $(current).fadeOut();
    $(next).fadeIn();
}

function startAnimation(layerContent) {
	$(layerContent.layerOne).fadeIn();
}

function endAnimation(layerContent) {
	$(layerContent.layerOne).fadeOut();
	$("#logo-image").fadeOut();
}