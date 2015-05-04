function simpleTransition(current, next) {
	$(current.layers).fadeOut();
	$(next.layers).fadeIn();
}

function startAnimation(layerContent) {
	$(layerContent.layers).fadeIn();
}

function endAnimation(layerContent) {
	$("#logo-image").fadeOut();
	$(layerContent.layers).fadeOut();
}