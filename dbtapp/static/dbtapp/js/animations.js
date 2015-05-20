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
	/*timeline.add(TweenLite.delayedCall(0,function () {
		$(first.parent).css("opacity", "1");
	}),null);*/
	
	//Setup
	timeline.add(TweenLite.to($("#company-text-intro"), 0.01, {opacity: 0}));
	timeline.add(TweenLite.to($(".compNameCont"), 0.01, {opacity: 0}));
	timeline.add(TweenLite.to($(".compLogo"), 0.01, {opacity: 0}));
	//timeline.add(TweenLite.to($("#video-text-intro"), 0.01, {scale: 0}));
	timeline.add(TweenLite.to($("#video-text-intro"), 0.01, {opacity: 1}));
	timeline.add(TweenLite.to($(first.parent), 0.01, {opacity:1}));
	
	//Stanan
	timeline.add(TweenLite.to($(first.parent), 0.5, {}));
	
	//Line
	//timeline.add(TweenLite.to($("#video-text-intro"), 0.5, {scale: 1, ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".lineL"), 0.8, {width:"50%"}));
	timeline.add(TweenLite.to($(".lineR"), 0.8, {delay: -0.8, width:"51%", left: "-=50%"}));
	
	//Company name
	timeline.add(TweenLite.to($(".compNameCont"), 1, {opacity:1, top: "55%"}));
	timeline.add(TweenLite.to($(".compLogo"), 1, {opacity:1, top: "70%"}));
	
	//timeline.add(TweenLite.to($(".compNameCont"), 1, {rotation: -90, transformOrigin:"60% 60%"}));
	
	//Stanan
	timeline.add(TweenLite.to($(first.parent), transitionLength, {}));
	
	//Erase
	timeline.add(TweenLite.to($(".lineL"), 0.5, {top:"30%"}));
	timeline.add(TweenLite.to($(".lineR"), 0.5, {delay: -0.5, top:"30%"}));
	timeline.add(TweenLite.to($("#video-text-intro"), 0.5, {delay: -0.5, opacity: 0}));
	timeline.add(TweenLite.to($(".lineL"), 0.8, {top:"80%"}));
	timeline.add(TweenLite.to($(".lineR"), 0.8, {delay: -0.8, top:"80%"}));
	timeline.add(TweenLite.to($(".compNameCont"), 0.5, {delay: -0.5, opacity: 0}));
	timeline.add(TweenLite.to($(".compLogo"), 0.5, {delay: -0.3, opacity: 0}));
	
	//Line
	timeline.add(TweenLite.to($(".lineL"), 0.8, {width:"0%"}));
	timeline.add(TweenLite.to($(".lineR"), 0.8, {delay: -0.8, width:"0%", left: "+=50%"}));

	//timeline.add(TweenLite.to($("#video-text-intro"), 0.01, {scale: 0}));
	
}
function startAnimationSetup(first) {
	
	$(".compNameCont").remove();
	$(".compLogo").remove();
	$(".lineL").remove();
	$(".lineR").remove();

	var lineL = document.createElement("div");
	lineL.className = "lineL";
	lineL.style.width = "0%";
	lineL.style.height = "1%";
	lineL.style.position = "absolute";
	lineL.style.left = "50%";
	lineL.style.top = "50%";
	lineL.style.backgroundColor = "rgba(0, 0, 0, 1)";	
	first.parent.appendChild(lineL);
	
	var lineR = document.createElement("div");
	lineR.className = "lineR";
	lineR.style.width = "0%";
	lineR.style.height = "1%";
	lineR.style.position = "absolute";
	lineR.style.left = "50%";
	lineR.style.top = "50%";
	lineR.style.backgroundColor = "rgba(0, 0, 0, 1)";	
	first.parent.appendChild(lineR);

	var compNameCont = document.createElement("div");
	compNameCont.className = "compNameCont";
	compNameCont.innerHTML = "<h2>" + $("#company-text-intro").html() + "</h2>";
	compNameCont.style.textAlign = "center";
	compNameCont.style.position = "absolute";
	compNameCont.style.width = "100%";
	compNameCont.style.top = "50%";
	first.parent.appendChild(compNameCont);
	
	var compLogo = document.createElement("div");
	compLogo.className = "compLogo";
	compLogo.style.textAlign = "center";
	compLogo.style.position = "absolute";
	compLogo.style.width = "10%";
	compLogo.style.height = "10%";
	compLogo.style.top = "65%";
	compLogo.style.left = "46.875%";
	compLogo.style.backgroundColor = "red";	
	first.parent.appendChild(compLogo);
	
}

function endAnimation(last, outro, timeline, transitionLength) {

	
	//Setup
	timeline.add(TweenLite.to($(last.parent), 0.01, {opacity:0}));
	timeline.add(TweenLite.to($("#video-text-outro"), 0.01, {opacity: 0}));
	timeline.add(TweenLite.to($("#video-text-outro"), 0.01, {scale: 2}));
	timeline.add(TweenLite.to($("#company-text-outro"), 0.01, {opacity: 0}));
	timeline.add(TweenLite.to($(".compLogoE"), 0.01, {opacity: 0}));
	timeline.add(TweenLite.to($(outro.parent), 0.01, {opacity:1}));

	//Write
	timeline.add(TweenLite.to($(".lineLE"), 0.8, {width:"50%"}));
	timeline.add(TweenLite.to($(".lineRE"), 0.8, {delay: -0.8, width:"51%", left: "-=50%"}));
	timeline.add(TweenLite.to($(".lineLE"), 0.8, {top:"25%"}));
	timeline.add(TweenLite.to($(".lineRE"), 0.8, {delay: -0.8, top:"25%"}));
	timeline.add(TweenLite.to($(".compLogoE"), 0.5, {delay: -0.7, opacity: 1}));
	timeline.add(TweenLite.to($("#company-text-outro"), 0.5, {delay: -0.6, opacity: 1}));
	timeline.add(TweenLite.to($("#video-text-outro"), 0.5, {delay: -0.3, opacity: 1}));
	
	//Line
	timeline.add(TweenLite.to($(".lineLE"), 0.5, {width:"0%"}));
	timeline.add(TweenLite.to($(".lineRE"), 0.5, {delay: -0.5, width:"0%", left: "+=50%"}));


	timeline.add(TweenLite.to($(outro.parent), transitionLength, {delay: 2, opacity: 0}));
}
function endAnimationSetup(last) {
	$(".lineLE").remove();
	$(".lineRE").remove();
	$(".compLogoE").remove();

	var lineLE = document.createElement("div");
	lineLE.className = "lineLE";
	lineLE.style.width = "0%";
	lineLE.style.height = "1%";
	lineLE.style.position = "absolute";
	lineLE.style.left = "50%";
	lineLE.style.top = "78%";
	lineLE.style.backgroundColor = "rgba(0, 0, 0, 1)";	
	last.parent.appendChild(lineLE);
	
	var lineRE = document.createElement("div");
	lineRE.className = "lineRE";
	lineRE.style.width = "0%";
	lineRE.style.height = "1%";
	lineRE.style.position = "absolute";
	lineRE.style.left = "50%";
	lineRE.style.top = "78%";
	lineRE.style.backgroundColor = "rgba(0, 0, 0, 1)";	
	last.parent.appendChild(lineRE);
	
	var compLogoE = document.createElement("div");
	compLogoE.className = "compLogoE";
	compLogoE.style.textAlign = "center";
	compLogoE.style.position = "absolute";
	compLogoE.style.width = "50px";
	compLogoE.style.height = "50px";
	compLogoE.style.top = "65%";
	compLogoE.style.left = "46.875%";
	compLogoE.style.backgroundColor = "red";	
	last.parent.appendChild(compLogoE);
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

function panoramaTextEffect(current, timeline, transitionLength) {
	// lägg nästa bild utanför
	timeline.add(TweenLite.delayedCall(0,function () {
		$(current.parent).css("-moz-transform", "scale(1.2)");
		$(current.parent).css("left", "80px");
	}),null);
	// animera tillbaka bilden som nu är synlig
	timeline.add(TweenLite.to($(current.parent), transitionLength, {left:"-10%",ease:Linear.easeNone}));
	// dölj den gamla bilden
	
	killTimeline(timeline);
}
function panoramaTextEffSetup(current, picText) {
	var picTextCont = document.createElement("div");
	picTextCont.className = "picText";
	picTextCont.innerHTML = "<h2>" + picText + "</h2>";
	picTextCont.style.textAlign = "center";
	picTextCont.style.position = "absolute";
	picTextCont.style.width = "50%";
	picTextCont.style.top = "50%";
	picTextCont.style.left = "10%";
	picTextCont.style.backgroundColor = "#ff3";
	current.parent.appendChild(picTextCont);
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

		var size = calcSize(current.parent, current.image);
		
		var div5 = document.createElement("div");
		div5.className = "backgroundEff";
		div5.style.width = size.width + "px";
		div5.style.height = size.height + "px";
		div5.style.position = "absolute";
		div5.style.backgroundPosition = "0px 0px";
		div5.style.backgroundSize = size.width + "px " + size.height + "px";
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
	
	timeline.add(TweenLite.to($(".first"), 1.5, {width:"25%", height:"100%", ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".second"), 0.8, {delay: -1, width:"25%", height:"100%", ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".third"), 0.8, {delay: -0.8, width:"25%", height:"100%", ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".fourth"), 1, {delay: -1, width:"25%", height:"100%", ease:Linear.easeNone}));
	
	timeline.add(TweenLite.to($(".background"), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(current.parent), 0.001, {opacity: 0}));
	//timeline.add(TweenLite.to($(next.image), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(".first"), 0.001, {width:"25%", height:"0%"}));
	timeline.add(TweenLite.to($(".second"), 0.001, {width:"25%", height:"0%"}));
	timeline.add(TweenLite.to($(".third"), 0.001, {width:"25%", height:"0%"}));
	timeline.add(TweenLite.to($(".fourth"), 0.001, {width:"25%", height:"0%"}));
	
	
	killTimeline(timeline);
	
	
}
function splitTransSetup(previous, current, next) {
	
	var size = calcSize(current.parent, current.image);
	
	var div = document.createElement("div");
	div.className = "first";
	div.style.width = "25%";
	div.style.height = "0%";
	div.style.position = "absolute";
	div.style.left = "0%";
	div.style.top = "0%";
	div.style.backgroundSize = size.width + "px " + size.height + "px";
	div.style.backgroundPosition = "0px 0px";
	div.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	var div2 = document.createElement("div");
	div2.className = "second";
	div2.style.width = "25%";
	div2.style.height = "0%";
	div2.style.position = "absolute";
	div2.style.left = "25%";
	div2.style.top = "0%";
	div2.style.backgroundSize = size.width + "px " + size.height + "px";
	div2.style.backgroundPosition = (size.width*0.75) + "px " + "0px";
	div2.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	var div3 = document.createElement("div");
	div3.className = "third";
	div3.style.width = "25%";
	div3.style.height = "0%";
	div3.style.position = "absolute";
	div3.style.left = "50%";
	div3.style.top = "0%";
	div3.style.backgroundSize = size.width + "px " + size.height + "px";
	div3.style.backgroundPosition = (size.width*0.5) + "px " + "0px";
	div3.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	var div4 = document.createElement("div");
	div4.className = "fourth";
	div4.style.width = "25%";
	div4.style.height = "0%";
	div4.style.position = "absolute";
	div4.style.left = "75%";
	div4.style.top = "0%";
	div4.style.backgroundSize = size.width + "px " + size.height + "px";
	div4.style.backgroundPosition = (size.width*0.25) + "px " + "0px";
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
		div5.style.backgroundSize = size.width + "px " + size.height + "px";
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
	
}

