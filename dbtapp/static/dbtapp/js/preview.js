function initPreview (imageSet) {	
    $("#preview-button").delay(1000).on("click", function() {
		$("#preview").css("opacity", "1");
    	//runSlideShow(sortSlideShow(imageSet));
		runSlideShow(imageSet);
    });
	
	$("#closeButton").on("click", function() {
		$("#preview").css("opacity", "0");
	});
}


function runSlideShow(video) {
	
	var timeline = new TimelineMax();
	
	initControls(timeline);
	
	//Set up additional animationelements
	for (var i = 0; i < video.images.length; i++) {
		video.images[i].parent.style.opacity = 0;
		video.intro.parent.style.opacity = 0;
		video.outro.parent.style.opacity = 0;

		video.images[i].transitionSetup(video.images[i-1], video.images[i], video.images[i+1]);	
		video.images[i].effectSetup(video.images[i]/*.parent*/);
	
	} 

	// Animera fram första sidan
	video.intro.transition(video.intro, timeline, video.intro.transitionLength);
	//vänta ett tag
	timeline.add(TweenLite.to(video.intro.parent, video.intro.effectLength, {})); 
	var current;
	var next;
	// loopa igenom alla bilder
	for (var i = 0; i < video.images.length; i++) {
		
		// animera fram nästa bild
		if(i == 0) { // om första bild
			intro = video.intro;
			first = video.images[0];
			
			first.transition(intro, first, timeline, first.transitionLength);
			first.effect(first, timeline, first.effectLength); 
		} 
		if (i < video.images.length-1) { // alla bilder
			current = video.images[i];
			next = video.images[i+1];

			current.transition(current, next, timeline, next.transitionLength);
			next.effect(next, timeline, next.effectLength);      
		} else { // sista bilden
			last = video.images[i];
			outro = video.outro;

			outro.transition(last, outro, timeline, video.outro.transitionLength);
			timeline.add(TweenLite.to(video.outro.parent, video.outro.effectLength, {})); 
		}
	} 
}