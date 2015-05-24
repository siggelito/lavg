/* Kombinationer
 * simpleTransition: panoramaEffect
 * shrinkTransition: plainEffect, zoomEffect, bounceEffect
 * splitTransistion: plainEffect, zoomEffect, bounceEffect
 * fadePanoramaTransition: panoramaEffect
 * rotateTransition: plaineffekt, zoomEffect, bounceEffect
 *
 * Har inga setupfunktioner: simpleTransistion, fadePanoramaTransition
 * */

/* Intro, outro*/
function lineStartAnimation(first, timeline, transitionLength) {
	/*timeline.add(TweenLite.delayedCall(0,function () {
		$(first.parent).css("opacity", "1");
	}),null);*/
	
	//Setup
	timeline.add(TweenLite.to($(first.parent), 0.01, {opacity:1}));
	timeline.add(TweenLite.to($(".videoNameCont"), 0.01, {opacity: 1}));
	timeline.add(TweenLite.to($(".videoNameCont"), 0.01, {scale: 0}));

	//Show
	timeline.add(TweenLite.to($(".videoNameCont"), 0.5, {scale: 1}));
	timeline.add(TweenLite.to($(".lineL"), 0.8, {width:"50%"}));
	timeline.add(TweenLite.to($(".lineR"), 0.8, {delay: -0.8, width:"51%", left: "-=50%"}));
	timeline.add(TweenLite.to($(".compNameCont"), 1, {opacity:1, top: "20%"}));
	timeline.add(TweenLite.to($(".compLogo"), 1, {delay: -0.2, opacity:1, top: "35%"}));
	
	//Stanan
	timeline.add(TweenLite.to($(first.parent), transitionLength, {}));
	
	//Erase
	timeline.add(TweenLite.to($(".lineL"), 0.6, {top:"0%"}));
	timeline.add(TweenLite.to($(".lineR"), 0.6, {delay: -0.6, top:"0%"}));
	timeline.add(TweenLite.to($(".videoNameCont"), 0.5, {delay: -0.5, opacity: 0}));
	timeline.add(TweenLite.to($(".lineL"), 0.8, {top:"60%"}));
	timeline.add(TweenLite.to($(".lineR"), 0.8, {delay: -0.8, top:"60%"}));
	timeline.add(TweenLite.to($(".compNameCont"), 0.5, {delay: -0.5, opacity: 0}));
	timeline.add(TweenLite.to($(".compLogo"), 0.5, {delay: -0.3, opacity: 0}));
	timeline.add(TweenLite.to($(".lineL"), 0.6, {width:"0%"}));
	timeline.add(TweenLite.to($(".lineR"), 0.6, {delay: -0.6, width:"0%", left: "+=50%"}));
}
function lineStartAnimationSetup(first) {
	
	$(".videoNameCont").remove();
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
	lineL.style.top = "15%";
	lineL.style.backgroundColor = first.textColor;	
	first.parent.appendChild(lineL);
	
	var lineR = document.createElement("div");
	lineR.className = "lineR";
	lineR.style.width = "0%";
	lineR.style.height = "1%";
	lineR.style.position = "absolute";
	lineR.style.left = "50%";
	lineR.style.top = "15%";
	lineR.style.backgroundColor = first.textColor;	
	first.parent.appendChild(lineR);
	
	var videoNameCont = document.createElement("div");
	videoNameCont.className = "videoNameCont";
	videoNameCont.style.fontSize = "200%";
	videoNameCont.style.textAlign = "center";
	videoNameCont.style.position = "absolute";
	videoNameCont.innerHTML = $("#video-text-intro").html();
	videoNameCont.style.width = "100%";
	videoNameCont.style.top = "-3%";
	videoNameCont.style.opacity = "0";
	first.parent.appendChild(videoNameCont);

	var compNameCont = document.createElement("div");
	compNameCont.className = "compNameCont";
	compNameCont.style.fontSize = "150%";
	compNameCont.style.textAlign = "center";
	compNameCont.style.position = "absolute";
	compNameCont.innerHTML = $("#company-text-intro").html();
	compNameCont.style.width = "100%";
	compNameCont.style.top = "15%";
	compNameCont.style.opacity = "0";
	first.parent.appendChild(compNameCont);
	
	//If logo
	if ($("#logo-img").attr("src") !== "") {
		var logoDiv = setLogo(first.parent);
		logoDiv.className = "compLogo";
		logoDiv.style.top = "31%";
		var leftPos = (first.parent.clientWidth/2) - (($(logoDiv).width())/2);
		logoDiv.style.left = leftPos + "px";
		logoDiv.style.opacity = "0";
		first.parent.appendChild(logoDiv);
	}

	/*if ($("#colInputTest").val() !== "") {
		first.parent.style.backgroundColor = $("#colInputTest").val();
		$("#slideshow").css("background-color",$("#colInputTest").val());
	}
	if ($("#colInputTest2").val() !== "") {
		first.parent.style.color = first.textColor; //$("#colInputTest2").val();
		lineL.style.backgroundColor = $("#colInputTest2").val();
		lineR.style.backgroundColor = $("#colInputTest2").val();
	}*/
	
	//Font, color
	first.parent.style.fontFamily = first.fontFamily;
	first.parent.style.color = first.textColor;
	first.parent.style.backgroundColor = first.backgroundColor;
	$("#slideshow").css("background-color", first.backgroundColor);

}

function fadeStartAnimation(first, timeline, transitionLength) {
	timeline.add(TweenLite.to($(first.parent), 1.5, {opacity:1}));
	//Stanan
	timeline.add(TweenLite.to($(first.parent), transitionLength, {}));
	//Erase
	timeline.add(TweenLite.to($(first.parent), 1, {opacity: 0}));
}
function fadeStartAnimationSetup(first) {
	$(".videoNameCont").remove();
	$(".compNameCont").remove();
	$(".compLogo").remove();

	var videoNameCont = document.createElement("div");
	videoNameCont.className = "videoNameCont";
	videoNameCont.style.fontSize = "200%";
	videoNameCont.style.textAlign = "center";
	videoNameCont.style.position = "absolute";
	videoNameCont.innerHTML = $("#video-text-intro").html();
	videoNameCont.style.width = "100%";
	videoNameCont.style.top = "-3%";
	videoNameCont.style.opacity = "1";
	first.parent.appendChild(videoNameCont);

	var compNameCont = document.createElement("div");
	compNameCont.className = "compNameCont";
	compNameCont.style.fontSize = "150%";
	compNameCont.style.textAlign = "center";
	compNameCont.style.position = "absolute";
	compNameCont.innerHTML = $("#company-text-intro").html();
	compNameCont.style.width = "100%";
	compNameCont.style.top = "20%";
	compNameCont.style.opacity = "1";
	first.parent.appendChild(compNameCont);
	
	//If logo
	if ($("#logo-img").attr("src") !== "") {
		var logoDiv = setLogo(first.parent);
		logoDiv.className = "compLogo";
		logoDiv.style.top = "35%";
		var leftPos = (first.parent.clientWidth/2) - (($(logoDiv).width())/2);
		logoDiv.style.left = leftPos + "px";
		first.parent.appendChild(logoDiv);
	}

	//Font, color
	first.parent.style.fontFamily = first.fontFamily;
	first.parent.style.color = first.textColor;
	first.parent.style.backgroundColor = first.backgroundColor;
	$("#slideshow").css("background-color", first.backgroundColor);
}

function spinStartAnimation(first, timeline, transitionLength) {
	timeline.add(TweenLite.to($(first.parent), 0.01, {opacity:1}));
	timeline.add(TweenLite.to($(".compNameCont"), 0.01, {opacity:0}));

	timeline.add(TweenLite.to($(".videoNameCont"), 1, {rotationX: (360*2), ease:Circ.easeOut}));
	timeline.add(TweenLite.to($(".compNameCont"), 0.01, {delay: -0.5, opacity:1}));
	timeline.add(TweenLite.to($(".compNameCont"), 1, {delay: -0.5, rotationX: (360*2), ease:Circ.easeOut}));
	timeline.add(TweenLite.to($(".compLogo"), 0.5, {delay: -0.4, height: (first.parent.clientWidth/6) + "px"}));

	timeline.add(TweenLite.to($(first.parent), transitionLength, {}));

	timeline.add(TweenLite.to($(first.parent), 1, {opacity: 0}));
}
function spinStartAnimationSetup(first) {
	$(".videoNameCont").remove();
	$(".compNameCont").remove();
	$(".compLogo").remove();

	var videoNameCont = document.createElement("div");
	videoNameCont.className = "videoNameCont";
	videoNameCont.style.fontSize = "200%";
	videoNameCont.style.textAlign = "center";
	videoNameCont.style.position = "absolute";
	videoNameCont.innerHTML = $("#video-text-intro").html();
	videoNameCont.style.width = "100%";
	videoNameCont.style.top = "-3%";
	videoNameCont.style.opacity = "1";
	first.parent.appendChild(videoNameCont);

	var compNameCont = document.createElement("div");
	compNameCont.className = "compNameCont";
	compNameCont.style.fontSize = "150%";
	compNameCont.style.textAlign = "center";
	compNameCont.style.position = "absolute";
	compNameCont.innerHTML = $("#company-text-intro").html();
	compNameCont.style.width = "100%";
	compNameCont.style.top = "20%";
	compNameCont.style.opacity = "1";
	first.parent.appendChild(compNameCont);
	
	//If logo
	if ($("#logo-img").attr("src") !== "") {
		var logoDiv = setLogo(first.parent);
		logoDiv.className = "compLogo";
		logoDiv.style.top = "35%";
		logoDiv.style.height = "0px";
		var leftPos = (first.parent.clientWidth/2) - (($(logoDiv).width())/2);
		logoDiv.style.left = leftPos + "px";
		first.parent.appendChild(logoDiv);
	}

	//Font, color
	first.parent.style.fontFamily = first.fontFamily;
	first.parent.style.color = first.textColor;
	first.parent.style.backgroundColor = first.backgroundColor;
	$("#slideshow").css("background-color", first.backgroundColor);
}

function lineEndAnimation(last, outro, timeline, transitionLength) {
	//Setup
	timeline.add(TweenLite.to($(last.parent), 0.01, {opacity:0}));
	timeline.add(TweenLite.to($(".videoNameContE"), 0.01, {opacity: 0}));
	timeline.add(TweenLite.to($(".compNameContE"), 0.01, {opacity: 0}));
	timeline.add(TweenLite.to($(".compLogoE"), 0.01, {opacity: 0}));
	timeline.add(TweenLite.to($(outro.parent), 0.01, {opacity:1}));

	//Write
	timeline.add(TweenLite.to($(".lineLE"), 0.8, {width:"50%"}));
	timeline.add(TweenLite.to($(".lineRE"), 0.8, {delay: -0.8, width:"51%", left: "-=50%"}));
	timeline.add(TweenLite.to($(".lineLE"), 0.8, {top:"25%"}));
	timeline.add(TweenLite.to($(".lineRE"), 0.8, {delay: -0.8, top:"25%"}));
	timeline.add(TweenLite.to($(".compLogoE"), 0.5, {delay: -0.7, opacity: 1}));
	timeline.add(TweenLite.to($(".compNameContE"), 0.5, {delay: -0.6, opacity: 1}));
	timeline.add(TweenLite.to($(".videoNameContE"), 0.5, {delay: -0.3, opacity: 1}));
	
	//Line
	timeline.add(TweenLite.to($(".lineLE"), 0.5, {width:"0%"}));
	timeline.add(TweenLite.to($(".lineRE"), 0.5, {delay: -0.5, width:"0%", left: "+=50%"}));

	timeline.add(TweenLite.to($(outro.parent), transitionLength, {delay: 2, opacity: 0}));
}
function lineEndAnimationSetup(last) {
	$(".videoNameContE").remove();
	$(".compNameContE").remove();
	$(".compLogoE").remove();
	$(".lineLE").remove();
	$(".lineRE").remove();
	
	var lineLE = document.createElement("div");
	lineLE.className = "lineLE";
	lineLE.style.width = "0%";
	lineLE.style.height = "1%";
	lineLE.style.position = "absolute";
	lineLE.style.left = "50%";
	lineLE.style.top = "78%";
	lineLE.style.backgroundColor = last.textColor;
	last.parent.appendChild(lineLE);
	
	var lineRE = document.createElement("div");
	lineRE.className = "lineRE";
	lineRE.style.width = "0%";
	lineRE.style.height = "1%";
	lineRE.style.position = "absolute";
	lineRE.style.left = "50%";
	lineRE.style.top = "78%";
	lineRE.style.backgroundColor = last.textColor;		
	last.parent.appendChild(lineRE);
	
	var videoNameContE = document.createElement("div");
	videoNameContE.className = "videoNameContE";
	videoNameContE.style.fontSize = "200%";
	videoNameContE.style.textAlign = "center";
	videoNameContE.style.position = "absolute";
	//compNameCont.style.fontFamily = first.fontFamily;
	//compNameCont.style.fontWeight = $("h2").css("font-weight");
	videoNameContE.innerHTML = $("#video-text-outro").html();
	videoNameContE.style.width = "100%";
	videoNameContE.style.top = "25%";
	videoNameContE.style.opacity = "0";
	last.parent.appendChild(videoNameContE);

	var compNameContE = document.createElement("div");
	compNameContE.className = "compNameContE";
	compNameContE.style.fontSize = "150%";
	compNameContE.style.textAlign = "center";
	compNameContE.style.position = "absolute";
	//compNameCont.style.fontFamily = first.fontFamily;
	//compNameCont.style.fontWeight = $("h2").css("font-weight");
	compNameContE.innerHTML = $("#company-text-outro").html();
	compNameContE.style.width = "100%";
	compNameContE.style.top = "50%";
	compNameContE.style.opacity = "0";
	last.parent.appendChild(compNameContE);
	
	//If logo
	if ($("#logo-img").attr("src") !== "") {
		var logoDiv = setLogo(last.parent);
		logoDiv.className = "compLogoE";
		logoDiv.style.top = "66%";
		var leftPos = (last.parent.clientWidth/2) - (($(logoDiv).width())/2);
		logoDiv.style.left = leftPos + "px";
		logoDiv.style.opacity = "1";
		last.parent.appendChild(logoDiv);
	}
	
	//Font, color
	last.parent.style.fontFamily = last.fontFamily;
	last.parent.style.color = last.textColor;
	last.parent.style.backgroundColor = last.backgroundColor;
	$("#slideshow").css("background-color", last.backgroundColor);
}

function fadeEndAnimation(last, outro, timeline, transitionLength) {
	timeline.add(TweenLite.to($(last.parent), 0.01, {opacity:0}));

	timeline.add(TweenLite.to($(outro.parent), 1.5, {opacity:1}));

	timeline.add(TweenLite.to($(outro.parent), transitionLength, {delay: 2, opacity: 0}));
}
function fadeEndAnimationSetup(last) {

	/*$(".videoNameContE").remove();
	$(".compNameContE").remove();
	$(".compLogoE").remove();*/

	var videoNameContE = document.createElement("div");
	videoNameContE.style.fontSize = "200%";
	videoNameContE.style.textAlign = "center";
	videoNameContE.style.position = "absolute";
	videoNameContE.innerHTML = $("#video-text-intro").html();
	videoNameContE.style.width = "100%";
	videoNameContE.style.top = "25%";
	videoNameContE.style.opacity = "1";
	last.parent.appendChild(videoNameContE);

	var compNameContE = document.createElement("div");
	compNameContE.style.fontSize = "150%";
	compNameContE.style.textAlign = "center";
	compNameContE.style.position = "absolute";
	compNameContE.innerHTML = $("#company-text-intro").html();
	compNameContE.style.width = "100%";
	compNameContE.style.top = "50%";
	compNameContE.style.opacity = "1";
	last.parent.appendChild(compNameContE);
	
	//If logo
	if ($("#logo-img").attr("src") !== "") {
		var logoDiv = setLogo(last.parent);
		logoDiv.className = "compLogoE";
		logoDiv.style.top = "66%";
		var leftPos = (last.parent.clientWidth/2) - (($(logoDiv).width())/2);
		logoDiv.style.left = leftPos + "px";
		last.parent.appendChild(logoDiv);
	}
	
	//Font, color
	last.parent.style.fontFamily = last.fontFamily;
	last.parent.style.color = last.textColor;
	last.parent.style.backgroundColor = last.backgroundColor;
	$("#slideshow").css("background-color", last.backgroundColor);
}

function spinEndAnimation(last, outro, timeline, transitionLength) {
	timeline.add(TweenLite.to($(last.parent), 0.01, {opacity:0}));

	timeline.add(TweenLite.to($(outro.parent), 0.01, {opacity:1}));
	timeline.add(TweenLite.to($(".compNameContE"), 0.01, {opacity:0}));
	
	timeline.add(TweenLite.to($(".videoNameContE"), 1, {rotationX: (360*2), ease:Circ.easeOut}));
	timeline.add(TweenLite.to($(".compNameContE"), 0.01, {delay: -0.5, opacity:1}));
	timeline.add(TweenLite.to($(".compNameContE"), 1, {delay: -0.5, rotationX: (360*2), ease:Circ.easeOut}));
	timeline.add(TweenLite.to($(".compLogoE"), 0.5, {delay: -0.4, height: (first.parent.clientWidth/6) + "px"}));

	timeline.add(TweenLite.to($(outro.parent), transitionLength, {delay: 2, opacity: 0}));
}
function spinEndAnimationSetup(last) {

	$(".videoNameContE").remove();
	$(".compNameContE").remove();
	$(".compLogoE").remove();

	var videoNameContE = document.createElement("div");
	videoNameContE.className = "videoNameContE";
	videoNameContE.style.fontSize = "200%";
	videoNameContE.style.textAlign = "center";
	videoNameContE.style.position = "absolute";
	videoNameContE.innerHTML = $("#video-text-intro").html();
	videoNameContE.style.width = "100%";
	videoNameContE.style.top = "25%";
	videoNameContE.style.opacity = "1";
	last.parent.appendChild(videoNameContE);

	var compNameContE = document.createElement("div");
	compNameContE.className = "compNameContE";
	compNameContE.style.fontSize = "150%";
	compNameContE.style.textAlign = "center";
	compNameContE.style.position = "absolute";
	compNameContE.innerHTML = $("#company-text-intro").html();
	compNameContE.style.width = "100%";
	compNameContE.style.top = "50%";
	compNameContE.style.opacity = "1";
	last.parent.appendChild(compNameContE);
	
	//If logo
	if ($("#logo-img").attr("src") !== "") {
		var logoDivE = setLogo(last.parent);
		logoDivE.className = "compLogoE";
		logoDivE.style.top = "66%";
		logoDivE.style.height = "0px";
		var leftPos = (last.parent.clientWidth/2) - (($(logoDivE).width())/2);
		logoDivE.style.left = leftPos + "px";
		last.parent.appendChild(logoDivE);
	}
	
	//Font, color
	last.parent.style.fontFamily = last.fontFamily;
	last.parent.style.color = last.textColor;
	last.parent.style.backgroundColor = last.backgroundColor;
	$("#slideshow").css("background-color", last.backgroundColor);
}

/* Effects */
function panoramaEffect(current, timeline, transitionLength) {
	// lägg nästa bild utanför
	timeline.add(TweenLite.delayedCall(0,function () {
		$(current.parent).css("-moz-transform", "scale(1.2)");
		$(current.parent).css("left", "10%");
	}),null);
	
	timeline.add(TweenLite.to($(".picPanoramaText"), 0.01, {width:"0%"}));
	timeline.add(TweenLite.to($(".picPanoramaText"), 0.01, {opacity: 1}));
	
	// animera tillbaka bilden som nu är synlig
	timeline.add(TweenLite.to($(current.parent), transitionLength, {left:"-10%",ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".picPanoramaText"), (transitionLength/3), {delay: -transitionLength, width:"100%", ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".picPanoramaText"), (transitionLength/3), {delay: -(transitionLength/3), width:"0%", left: "+=100%", ease:Linear.easeNone}));

	timeline.add(TweenLite.to($(".picPanoramaText"), 0.01, {left: "0%"}));
	timeline.add(TweenLite.to($(".picPanoramaText"), 0.01, {opacity: 0}));

	killTimeline(timeline);
}
function panoramaEffSetup(current) {
	if ((current.description.innerHTML) !== "None") {
		//alert((current.description.innerHTML).localeCompare("none"));
		var picTextCont = document.createElement("div");
		picTextCont.className = "picPanoramaText";
		picTextCont.innerHTML =  current.description.innerHTML;
		picTextCont.style.textAlign = "center";
		picTextCont.style.position = "absolute";
		picTextCont.style.width = "0%";
		picTextCont.style.top = "80%";
		picTextCont.style.left = "0%";
		picTextCont.style.opacity = "0";
		picTextCont.style.fontFamily = current.fontFamily;
		picTextCont.style.color = current.textColor;
		picTextCont.style.backgroundColor = current.backgroundColor;

		current.parent.appendChild(picTextCont);
	}
}

function plainEffect(current, timeline, effectLength) {
	timeline.add(TweenLite.to($(current.parent), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(current.image), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(".backgroundEff"), 0.001, {opacity: 1}));

	timeline.add(TweenLite.to($(current.parent), 2, {width:"100%", height:"100%"}));
	timeline.add(TweenLite.to($(".picPlainText"), 1.5, {delay: -1.5, opacity: 1}));
	
	timeline.add(TweenLite.to($(current.parent), effectLength, {}));
	
	timeline.add(TweenLite.to($(".picPlainText"), 0.4, {opacity: 0}));
	timeline.add(TweenLite.to($(".backgroundEff"), 0.001, {opacity: 0}));
	
}
function plainEffSetup(current) {
	if (current.image != undefined) {

		var div5 = document.createElement("div");
		div5.className = "backgroundEff";
		div5.style.width = current.parent.clientWidth + "px";
		div5.style.height = current.parent.clientHeight + "px";
		div5.style.position = "absolute";
		div5.style.backgroundPosition = "0px 0px";
		div5.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
		div5.style.opacity="0";
		div5.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";		
		current.parent.appendChild(div5);
	}
	
	//Text
	if ((current.description.innerHTML) !== "None") {
		var picTextCont = document.createElement("div");
		picTextCont.className = "picPlainText";
		picTextCont.innerHTML =  current.description.innerHTML;
		picTextCont.style.textAlign = "center";
		picTextCont.style.position = "absolute";
		picTextCont.style.fontSize = "200%";
		picTextCont.style.left = "50%";
		picTextCont.style.top = "90%";
		picTextCont.style.transform = "translate(-50%, -90%)";
		picTextCont.style.padding = "2%";
		picTextCont.style.opacity = "0";
		picTextCont.style.fontFamily = current.fontFamily;
		picTextCont.style.color = current.textColor;
		picTextCont.style.backgroundColor = "rgba(255, 255, 255, 0)";//current.backgroundColor;
		
		current.parent.appendChild(picTextCont);
	}
}

function zoomEffect(current, timeline, effectLength) {
	timeline.add(TweenLite.to($(current.parent), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(current.image), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(".backgroundEff"), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(current.parent), 0.001, {width:"100%", height:"100%"}));
	
	//timeline.add(TweenLite.to($(current.parent), effectLength, {}));
	timeline.add(TweenLite.to($(current.parent), effectLength, {scale:1.5, ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(current.parent), effectLength, {scale:1, ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".picPlainText"), 1.5, {delay: -effectLength*1.8, opacity: 1}));
	
	timeline.add(TweenLite.to($(".picPlainText"), 0.4, {opacity: 0}));
	timeline.add(TweenLite.to($(".backgroundEff"), 0.001, {opacity: 0}));
	
}
function zoomEffSetup(current) {
	if (current.image != undefined) {

		var div5 = document.createElement("div");
		div5.className = "backgroundEff";
		div5.style.width = current.parent.clientWidth + "px";
		div5.style.height = current.parent.clientHeight + "px";
		div5.style.position = "absolute";
		div5.style.backgroundPosition = "0px 0px";
		div5.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
		div5.style.opacity="0";
		div5.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";		
		current.parent.appendChild(div5);
	}
	
	//Text
	if ((current.description.innerHTML) !== "None") {
		var picTextCont = document.createElement("div");
		picTextCont.className = "picPlainText";
		picTextCont.innerHTML =  current.description.innerHTML;
		picTextCont.style.textAlign = "center";
		picTextCont.style.position = "absolute";
		picTextCont.style.fontSize = "200%";
		picTextCont.style.left = "50%";
		picTextCont.style.top = "85%";
		picTextCont.style.transform = "translate(-50%, -90%)";
		picTextCont.style.padding = "2%";
		picTextCont.style.opacity = "0";
		picTextCont.style.fontFamily = current.fontFamily;
		picTextCont.style.color = current.textColor;
		picTextCont.style.backgroundColor = "rgba(255, 255, 255, 0)";//current.backgroundColor;
		
		current.parent.appendChild(picTextCont);
	}
}

function bounceEffect(current, timeline, effectLength) {
	timeline.add(TweenLite.to($(current.parent), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(current.image), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(".backgroundEff"), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(current.parent), 0.001, {width:"100%", height:"100%"}));
	
	//timeline.add(TweenLite.to($(current.parent), effectLength, {}));
	timeline.add(TweenLite.to($(current.parent), effectLength, {scale:1.5, ease:Bounce.easeOut}));
	timeline.add(TweenLite.to($(current.parent), 0.4, {scale:1, ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".picPlainText"), 1.5, {delay: -effectLength*1.2, opacity: 1}));
	
	timeline.add(TweenLite.to($(".picPlainText"), 0.4, {opacity: 0}));
	timeline.add(TweenLite.to($(".backgroundEff"), 0.001, {opacity: 0}));
	
}
function bounceEffSetup(current) {
	if (current.image != undefined) {

		var div5 = document.createElement("div");
		div5.className = "backgroundEff";
		div5.style.width = current.parent.clientWidth + "px";
		div5.style.height = current.parent.clientHeight + "px";
		div5.style.position = "absolute";
		div5.style.backgroundPosition = "0px 0px";
		div5.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
		div5.style.opacity="0";
		div5.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";		
		current.parent.appendChild(div5);
	}
	
	//Text
	if ((current.description.innerHTML) !== "None") {
		var picTextCont = document.createElement("div");
		picTextCont.className = "picPlainText";
		picTextCont.innerHTML =  current.description.innerHTML;
		picTextCont.style.textAlign = "center";
		picTextCont.style.position = "absolute";
		picTextCont.style.fontSize = "200%";
		picTextCont.style.left = "50%";
		picTextCont.style.top = "85%";
		picTextCont.style.transform = "translate(-50%, -90%)";
		picTextCont.style.padding = "2%";
		picTextCont.style.opacity = "0";
		picTextCont.style.fontFamily = current.fontFamily;
		picTextCont.style.color = current.textColor;
		picTextCont.style.backgroundColor = "rgba(255, 255, 255, 0)";//current.backgroundColor;
		
		current.parent.appendChild(picTextCont);
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
	timeline.add(TweenLite.to($(current.parent), transitionLength, {opacity:0,ease:Linear.easeNone}), ("-="+transitionLength));
	// dölj den gamla bilden
	/*timeline.add(TweenLite.delayedCall(0,function () {
		$(current.parent).css("opacity", "0");
	}),null);*/
	
	//killTimeline(timeline);
}

function fadePanoramaTransition(current, next, timeline, transitionLength) {
	timeline.add(TweenLite.to($(next.parent), 0.01, {scale:1.2, left:"10%"}));
	timeline.add(TweenLite.to($(next.parent), transitionLength, {opacity:1,ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(current.parent), transitionLength, {opacity:0,ease:Linear.easeNone}), ("-="+transitionLength));
}

function splitTransition(current, next, timeline, transitionLength) {
	timeline.add(TweenLite.to($(next.parent), 0.001, {backgroundColor: current.backgroundColor}));
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
	
	var div = document.createElement("div");
	div.className = "first";
	div.style.width = "25%";
	div.style.position = "absolute";
	div.style.left = "0%";
	div.style.top = "0%";
	div.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
	div.style.backgroundPosition = "0px 0px";
	div.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	var div2 = document.createElement("div");
	div2.className = "second";
	div2.style.width = "25%";
	div2.style.height = "0%";
	div2.style.position = "absolute";
	div2.style.left = "25%";
	div2.style.top = "0%";
	div2.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
	div2.style.backgroundPosition = (current.parent.clientWidth*0.75) + "px " + "0px";
	div2.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	var div3 = document.createElement("div");
	div3.className = "third";
	div3.style.width = "25%";
	div3.style.height = "0%";
	div3.style.position = "absolute";
	div3.style.left = "50%";
	div3.style.top = "0%";
	div3.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
	div3.style.backgroundPosition = (current.parent.clientWidth*0.5) + "px " + "0px";
	div3.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	
	var div4 = document.createElement("div");
	div4.className = "fourth";
	div4.style.width = "25%";
	div4.style.height = "0%";
	div4.style.position = "absolute";
	div4.style.left = "75%";
	div4.style.top = "0%";
	div4.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
	div4.style.backgroundPosition = (current.parent.clientWidth*0.25) + "px " + "0px";
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
		div5.style.backgroundPosition = "0px 0px";
		div5.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
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
	timeline.add(TweenLite.to($(next.parent), 0.001, {backgroundColor: current.backgroundColor}));
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
	div.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
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
		div2.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
		div2.style.backgroundImage = "url('" + previous.image.getAttribute("src") + "')";	
		
		current.parent.appendChild(div2);
	}
	current.parent.appendChild(div);
}

function rotateTransition(current, next, timeline, transitionLength) {
	timeline.add(TweenLite.to($(next.parent), 0.001, {backgroundColor: current.backgroundColor}));
	timeline.add(TweenLite.to($(next.parent), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(next.image), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(".background"), 0.001, {opacity: 1}));
	timeline.add(TweenLite.to($(".shrink"), 0.001, {css: {rotationY: -90, rotationX: -90}}));
	
	//timeline.add(TweenLite.to($(".shrink"), transitionLength, {width:"50%", height:"50%", ease:Linear.easeNone}));
	timeline.add(TweenLite.to($(".shrink"), 1, {css: {rotationY: 0, rotationX: 0}}));
	
	timeline.add(TweenLite.to($(".background"), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(current.parent), 0.001, {opacity: 0}));
	timeline.add(TweenLite.to($(next.image), 0.001, {opacity: 1}));
	//timeline.add(TweenLite.to($(".shrink"), 0.001, {width:"0%", height:"0%"}));
	
	
	killTimeline(timeline);
}
function rotateTransSetup(previous, current, next) {
	var div = document.createElement("div");
	div.className = "shrink";
	div.style.width = "100%";
	div.style.height = "100%";
	div.style.position = "absolute";
	div.style.left = "50%";
	div.style.top = "50%";
	div.style.transform = "translate(-50%, -50%)";
	div.style.backgroundPosition = "center";
	div.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
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
		div2.style.backgroundSize = current.parent.clientWidth + "px " + current.parent.clientHeight + "px";
		div2.style.backgroundImage = "url('" + previous.image.getAttribute("src") + "')";	
		
		current.parent.appendChild(div2);
	}
	current.parent.appendChild(div);
}

/* Setup common */
function setLogo(parent){
	var compLogo = document.createElement("div");
		compLogo.style.textAlign = "center";
		compLogo.style.position = "absolute";
		compLogo.style.width = (parent.clientWidth/6) + "px";
		compLogo.style.height = (parent.clientWidth/6) + "px";
		
		var logoIm = new Image();
		logoIm.src = $("#logo-img").attr("src");
		//Landscape
		var prop;
		if (logoIm.naturalWidth > logoIm.naturalHeight) {
			prop = logoIm.naturalWidth/(parent.clientWidth/6);
		}
		else{//Portrait
			prop = logoIm.naturalHeight/(parent.clientWidth/6);
		}
	
		compLogo.style.backgroundSize = (logoIm.naturalWidth/prop) + "px " + (logoIm.naturalHeight/prop) + "px";
		compLogo.style.backgroundRepeat="no-repeat";
		compLogo.style.backgroundPosition = "center";
		compLogo.style.backgroundImage = "url('" + $("#logo-img").attr("src") + "')";
		compLogo.style.opacity = "1";
		return compLogo;
	
		/*	localStorage.setItem("logoScr", $("#logo-img").attr("src"));
	
	alert(localStorage.getItem('logoScr'));
	
	var compLogo = document.createElement("div");
		compLogo.style.textAlign = "center";
		compLogo.style.position = "absolute";
		compLogo.style.width = (parent.clientWidth/6) + "px";
		compLogo.style.height = (parent.clientWidth/6) + "px";
		
		var logoIm = new Image();
		logoIm.src = $("#logo-img").attr("src");
		//Landscape
		var prop;
		if (logoIm.naturalWidth > logoIm.naturalHeight) {
			prop = logoIm.naturalWidth/(parent.clientWidth/6);
		}
		else{//Portrait
			prop = logoIm.naturalHeight/(parent.clientWidth/6);
		}
	
		compLogo.style.backgroundSize = (logoIm.naturalWidth/prop) + "px " + (logoIm.naturalHeight/prop) + "px";
		compLogo.style.backgroundRepeat="no-repeat";
		compLogo.style.backgroundPosition = "center";
		compLogo.style.backgroundImage = "url('" + localStorage.getItem('logoScr') + "')";
		compLogo.style.opacity = "1";
		return compLogo;*/
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



