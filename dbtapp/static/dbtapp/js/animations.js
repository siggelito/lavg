function simpleTransition(current, next) {
	for (var i = 0; i < current.layers.length; i++) {
		$(current.layers[i]).fadeOut();
	};
	for (var i = 0; i < next.layers.length; i++) {
		$(next.layers[i]).fadeIn();
	};
}

function startAnimation(layerContent) {
	for (var i = 0; i < layerContent.layers.length; i++) {
		$(layerContent.layers[i]).fadeIn();
	};
}

function endAnimation(layerContent) {
	$("#logo-image").fadeOut();
	for (var i = 0; i < layerContent.layers.length; i++) {
		$(layerContent.layers[i]).fadeOut();
	};
}