/* Kombinationer
 * simpleTransition: panoramaEffect
 * shrinkTransition: plainEffect
 * splitTransistion: plainEffect
 * fadePanoramaTransition: panoramaEffect
 *
 * Har inga setupfunktioner: simpleTransistion, fadePanoramaTransition
 * */

/* Intro, outro*/
function startAnimation(first, timeline, transitionLength) {
	timeline.add(TweenLite.delayedCall(0,function () {
		$(first.parent).css("opacity", "1");
	}),null);
	timeline.add(TweenLite.to($(first.parent), 2, {opacity: 1}));
}

function endAnimation(last, outro, timeline, transitionLength) {
	timeline.add(TweenLite.to($(outro.parent), transitionLength, {opacity:0}));
	timeline.add(TweenLite.delayedCall(0,function () {
		$(last.parent).css("opacity", "0");
	}),null);
	
	timeline.add(TweenLite.to($(outro.parent), 1, {opacity: 1}), "-="+transitionLength);

}

/* Effects */
function panoramaEffect(current, timeline, transitionLength) {
	// lägg nästa bild utanför
	timeline.add(TweenLite.delayedCall(0,function () {
		$(current.parent).css("-moz-transform", "scale(1.2)");
		$(current.parent).css("left", "10%");
	}),null);
	// animera tillbaka bilden som nu är synlig
	timeline.add(TweenLite.to($(current.parent), transitionLength, {left:"-10%",ease:Linear.easeNone}));
	// dölj den gamla bilden
	
	killTimeline(timeline);
}
function panoramaEffSetup(parent) {
	$(parent.parent).css("-moz-transform", "scale(1.2)");
	$(parent.parent).css("left", "10%");
}

function plainEffect(current, timeline, effectLength) {
	timeline.add(TweenLite.to($(current.parent), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(current.image), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(".backgroundEff"), 0.001, {opacity: 1}));

	timeline.add(TweenLite.to($(current.parent), 2, {width:"100%", height:"100%"}));
	
	timeline.add(TweenLite.to($(".backgroundEff"), 0.001, {opacity: 0}));
}
function plainEffSetup(current) {
	if (current.image != undefined) {

		var div5 = document.createElement("div");
		div5.className = "backgroundEff";
		div5.style.width = "100%";
		div5.style.height = "100%";
		div5.style.position = "absolute";
		div5.style.left = "50%";
		div5.style.top = "50%";
		div5.style.transform = "translate(-50%, -50%)";
		div5.style.backgroundPosition = "center";
		div5.style.backgroundSize="800px 480px";
		div5.style.backgroundColor = "red";
		div5.style.opacity="0";
		div5.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";		
		current.parent.appendChild(div5);
	}
}

/* Transisions */
function simpleTransition(current, next, timeline, transitionLength) {
	// lägg nästa bild utanför

	/*var div = document.createElement("div");
	div.style.width = "50px";
	div.style.height = "50px";
	div.style.backgroundColor = "#ff3";
	div.style.position = "absolute";
	div.style.left = "100px";
	div.style.top = "100px";*/
	var orgPos = next.parent.style.left;
	timeline.add(TweenLite.to($(next.parent), 0.01, {left:"100%"}));
	timeline.add(TweenLite.to($(next.parent), 0.01, {scale:1.2}));
	timeline.add(TweenLite.to($(next.parent), 0.01, {opacity:1}));
	/*timeline.add(TweenLite.delayedCall(0,function () {
		$(next.parent).css("left", "800px");
		$(next.parent).css("opacity", "1");
		next.parent.appendChild(div);
	}),null);*/
	// animera tillbaka bilden som nu är synlig
	timeline.add(TweenLite.to($(next.parent), 2, {left:"10%", ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(current.parent), 0.01, {opacity:0}));
	// dölj den gamla bilden
	/*timeline.add(TweenLite.delayedCall(0,function () {
		$(current.parent).css("opacity", "0");
		//next.parent.removeChild(div);
	}),null);*/
	
	killTimeline(timeline);
}

function fadeTransition(current, next, timeline, transitionLength) {
	// animera tillbaka bilden som nu är synlig
	timeline.add(TweenLite.to($(next.parent), transitionLength, {opacity:1,ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(current.parent), transitionLength, {opacity:0,ease:Linear.easeNone}), "-="+transitionLength);
	// dölj den gamla bilden
	/*timeline.add(TweenLite.delayedCall(0,function () {
		$(current.parent).css("opacity", "0");
	}),null);*/
	
	//killTimeline(timeline);
}

function fadePanoramaTransition(current, next, timeline, transitionLength) {
	timeline.add(TweenLite.to($(next.parent), 0.01, {scale:1.2, left:"10%"}));
	timeline.add(TweenLite.to($(next.parent), transitionLength, {opacity:1,ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(current.parent), transitionLength, {delay: -transitionLength, opacity:1,ease:Linear.easeNone}));
}

function splitTransition(current, next, timeline, transitionLength) {
	
	//timeline.add(TweenMax.set($(next.parent), {opacity:1}));
	timeline.add(TweenLite.to($(next.parent), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(next.image), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(".background"), 0.001, {opacity: 1}));
	
	timeline.add(TweenLite.to($(".first"), 2.5, {width:"25%", height:"100%", ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".second"), 1.5, {delay: -2, width:"25%", height:"100%", ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".third"), 1.5, {delay: -1.5, width:"25%", height:"100%", ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".fourth"), 2, {delay: -1.5, width:"25%", height:"100%", ease:Linear.easeNone}));
	
	timeline.add(TweenLite.to($(".background"), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(current.parent), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(next.image), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(".first"), 0.001, {width:"25%", height:"0%"}));
	timeline.add(TweenLite.to($(".second"), 0.001, {width:"25%", height:"0%"}));
	timeline.add(TweenLite.to($(".third"), 0.001, {width:"25%", height:"0%"}));
	timeline.add(TweenLite.to($(".fourth"), 0.001, {width:"25%", height:"0%"}));
	
	
	killTimeline(timeline);
	
	
}
function splitTransSetup(previous, current, next) {
	var div = document.createElement("div");
	div.className = "first";
	div.style.width = "25%";
	div.style.height = "0%";
	div.style.position = "absolute";
	div.style.left = "0%";
	div.style.top = "0%";
	div.style.backgroundSize="800px 480px";
	div.style.backgroundPosition = "0px 0px";
	div.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	var div2 = document.createElement("div");
	div2.className = "second";
	div2.style.width = "25%";
	div2.style.height = "0%";
	div2.style.position = "absolute";
	div2.style.left = "25%";
	div2.style.top = "0%";
	div2.style.backgroundSize="800px 480px";
	div2.style.backgroundPosition = "600px 0px";
	div2.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	var div3 = document.createElement("div");
	div3.className = "third";
	div3.style.width = "25%";
	div3.style.height = "0%";
	div3.style.position = "absolute";
	div3.style.left = "50%";
	div3.style.top = "0%";
	div3.style.backgroundSize="800px 480px";
	div3.style.backgroundPosition = "400px 0px";
	div3.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	var div4 = document.createElement("div");
	div4.className = "fourth";
	div4.style.width = "25%";
	div4.style.height = "0%";
	div4.style.position = "absolute";
	div4.style.left = "75%";
	div4.style.top = "0%";
	div4.style.backgroundSize="800px 480px";
	div4.style.backgroundPosition = "200px 0px";
	div4.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	if (previous != undefined) {

		var div5 = document.createElement("div");
		div5.className = "background";
		div5.style.width = "100%";
		div5.style.height = "100%";
		div5.style.position = "absolute";
		div5.style.left = "50%";
		div5.style.top = "50%";
		div5.style.transform = "translate(-50%, -50%)";
		div5.style.backgroundPosition = "center";
		div5.style.backgroundSize="800px 480px";
		div5.style.backgroundColor = "red";
		div5.style.backgroundImage = "url('" + previous.image.getAttribute("src") + "')";	
		
		current.parent.appendChild(div5);
	}
	current.parent.appendChild(div);
	current.parent.appendChild(div2);
	current.parent.appendChild(div3);
	current.parent.appendChild(div4);
}

function shrinkTransition(current, next, timeline, transitionLength) {
	//timeline.add(TweenMax.set($(next.parent), {opacity:1}));
	timeline.add(TweenLite.to($(next.parent), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(next.image), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(".background"), 0.001, {opacity: 1}));
	
	timeline.add(TweenLite.to($(".shrink"), transitionLength, {width:"100%", height:"100%", ease:Linear.easeNone}));
	
	timeline.add(TweenLite.to($(".background"), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(current.parent), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(next.image), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(".shrink"), 0.001, {width:"0%", height:"0%"}));
	
	killTimeline(timeline);
}
function shrinkTransSetup(previous, current, next) {
	var div = document.createElement("div");
	div.className = "shrink";
	div.style.width = "0%";
	div.style.height = "0%";
	div.style.position = "absolute";
	div.style.left = "50%";
	div.style.top = "50%";
	div.style.transform = "translate(-50%, -50%)";
	div.style.backgroundPosition = "center";
	div.style.backgroundSize="800px 480px";
	div.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	if (previous != undefined) {

		var div2 = document.createElement("div");
		div2.className = "background";
		div2.style.width = "100%";
		div2.style.height = "100%";
		div2.style.position = "absolute";
		div2.style.left = "50%";
		div2.style.top = "50%";
		div2.style.transform = "translate(-50%, -50%)";
		div2.style.backgroundPosition = "center";
		div2.style.backgroundSize="800px 480px";
		div2.style.backgroundColor = "red";
		div2.style.backgroundImage = "url('" + previous.image.getAttribute("src") + "')";	
		
		current.parent.appendChild(div2);
	}
	current.parent.appendChild(div);
}

/* Timeline */
/* Timeline börjar om när stängknappen på previewfönster trycks */
function killTimeline(timeline) {
	$("#closeButton").on("click", function() {
		/*$(current.parent).css("opacity", "0");
		$(next.parent).css("opacity", "0");
		timeline.kill();*/
		$("#preview").css("opacity", "0");
		timeline.restart();
		$("#slider").slider("value", timeline.progress() *100);
		timeline.progress(1);
		timeline.kill();	
	});
}


/* Timeline stoppas när stängknappen på previewfönster trycks */
function killTimelineWithImage(timeline, current, next) {
	$("#closeButton").on("click", function() {
		$("#preview").css("opacity", "0");
		
		$(current.parent).css("opacity", "0");
		$(next.parent).css("opacity", "0");

		if(current.image != null) {
			$(current.image).css("opacity", "0");
		}
		if(next.image != null) {
			$(next.image).css("opacity", "0");
		}
		
		timeline.kill();	
	});
}

function initControls(timeline){
	
	$("#pause").on("click", function() {

		timeline.paused(!timeline.paused());
		
		if (!timeline.paused()) {
			$(this).html("<span class='glyphicon glyphicon-pause'></span>");
		}
		else{
			$(this).html("<span class='glyphicon glyphicon-play'></span>");
		}
	
	});

	timeline.eventCallback("onUpdate", updateSlider);

	$("#slider").slider({
		range: false,
		min: 0,
		max: 100,
		step:.1,
		slide: function ( event, ui ) {
		  timeline.pause();
		  $("#pause").html("<span class='glyphicon glyphicon-play'></span>");
		  //adjust the timeline's progress() based on slider value
		  timeline.progress( ui.value/100 );
		}
	}); 
	
	function updateSlider() {
		$("#slider").slider("value", timeline.progress() *100);
	}
	
	timeline.progress(1)
	
	$("#slideshow-container").on({
		'mouseenter':function(){
			$("#controls").fadeTo(500, 1);
		},'mouseleave':function(){
			$("#controls").fadeTo(500, 0);
		}
	});
}

