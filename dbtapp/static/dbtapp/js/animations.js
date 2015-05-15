function simpleTransition(current, next, timeline, transitionLength) {
	// lägg nästa bild utanför

	var div = document.createElement("div");
	
	div.style.width = "50px";
	div.style.height = "50px";
	div.style.backgroundColor = "#ff3";
	div.style.position = "absolute";
	div.style.left = "100px";
	div.style.top = "100px";

	timeline.add(TweenLite.delayedCall(0,function () {
		$(next.parent).css("left", "800px");
		$(next.parent).css("opacity", "1");
		next.parent.appendChild(div);
	}),null);
	// animera tillbaka bilden som nu är synlig
	timeline.add(TweenLite.to($(next.parent), 2, {left:0}));
	// dölj den gamla bilden
	timeline.add(TweenLite.delayedCall(0,function () {
		$(current.parent).css("opacity", "0");
		next.parent.removeChild(div);
	}),null);
	
	killTimeline(timeline, current, next);
}


function startAnimation(first, timeline, transitionLength) {
	timeline.add(TweenLite.delayedCall(0,function () {
		$(first.parent).css("opacity", "1");
	}),null);
	timeline.add(TweenLite.to($(first.parent), 2, {opacity: 1}));
}


function endAnimation(last, outro, timeline, transitionLength) {
	timeline.add(TweenLite.to($(outro.parent), transitionLength, {opacity:1}));
	timeline.add(TweenLite.delayedCall(0,function () {
		$(last.parent).css("opacity", "0");
	}),null);
	
	timeline.add(TweenLite.to($(outro.parent), 1, {delay: 2, opacity: 0}));

}

function fadeTransition(current, next, timeline, transitionLength) {
	timeline.add(TweenLite.to($(next.parent), transitionLength, {opacity: 1}));
	timeline.add(TweenLite.to($(current.parent), transitionLength, {opacity: 0}));
	
	killTimeline(timeline, current, next);
}

function splitTransition(current, next, timeline, transitionLength) {
	
	timeline.add(TweenLite.delayedCall(0, function () {
		$(current.image).css("opacity", "1");
		$(next.image).css("opacity", "0");
		$(next.parent).css("opacity", "1");
	}),null);

	timeline.add(TweenLite.to($(".first"), transitionLength, {width:"25%", height:"100%"}));
	timeline.add(TweenLite.to($(".second"), transitionLength, {delay: -1.75, width:"25%", height:"100%"}));
	timeline.add(TweenLite.to($(".third"), transitionLength, {delay: -1.75, width:"25%", height:"100%"}));
	timeline.add(TweenLite.to($(".fourth"), transitionLength, {delay: -1.75, width:"31%", height:"100%"}));
	//timeline.add(TweenMax.to(TweenMax.to($(".second"), transitionLength, {height: "100%", left: "+=100%"})));
	
	timeline.add(TweenLite.delayedCall(0, function () {
		$(".first").css("height", "0%");
		$(".second").css("height", "0%");
		$(".third").css("height", "0%");
		$(".fourth").css("height", "0%");
		$(current.parent).css("opacity", "0");
		
	}),null);
	
	
	killTimeline(timeline, current, next);
	
	
}


function splitTransSetup(video, i) {

	var div = document.createElement("div");
	div.className = "first";
	div.style.width = "25%";
	div.style.height = "0%";
	div.style.backgroundColor = "#ff3";
	div.style.position = "absolute";
	div.style.left = "0%";
	div.style.top = "0%";

	var div2 = document.createElement("div");
	div2.className = "second";
	div2.style.width = "25%";
	div2.style.height = "0%";
	div2.style.backgroundColor = "#ff3";
	div2.style.position = "absolute";
	div2.style.left = "19%";
	div2.style.top = "0%";
	div2.style.backgroundPosition = "25% 0%";

	var div3 = document.createElement("div");
	div3.className = "third";
	div3.style.width = "25%";
	div3.style.height = "0%";
	div3.style.backgroundColor = "#ff3";
	div3.style.position = "absolute";
	div3.style.left = "44%";
	div3.style.top = "0%";
	div3.style.backgroundPosition = "58% 0%";
	
	var div4 = document.createElement("div");
	div4.className = "fourth";
	div4.style.width = "31%";
	div4.style.height = "0%";
	div4.style.backgroundColor = "#ff3";
	div4.style.position = "absolute";
	div4.style.right = "0%";
	div4.style.top = "0%";
	div4.style.backgroundPosition = "100% 0%";	
	
		
	current = video.images[i];
	div.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	current.parent.appendChild(div);

	div2.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	current.parent.appendChild(div2);
		
	div3.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	current.parent.appendChild(div3);
		
	div4.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
	current.parent.appendChild(div4);

}


function shrinkTransition(current, next, timeline, transitionLength) {
	
	timeline.add(TweenLite.delayedCall(0,function () {
		$(next.parent).css("opacity", "1");
	}),null);

	timeline.add(TweenLite.to($(".shrink"), transitionLength, {width:"0%", height:"0%"}));

	timeline.add(TweenLite.delayedCall(0, function () {
		//restore shrink
		$(".shrink").css("width", "100%");
		$(".shrink").css("height", "100%");
		$(current.parent).css("opacity", "0");
		
	}),null);
	
	killTimeline(timeline, current, next);
	
}

function shrinkTransSetup(video, i) {
	var div = document.createElement("div");
	div.className = "shrink";
	div.style.width = "100%";
	div.style.height = "100%";
	div.style.backgroundColor = "#ff3";
	div.style.position = "absolute";
	div.style.left = "50%";
	div.style.top = "50%";
	div.style.transform = "translate(-50%, -50%)";
	div.style.backgroundPosition = "center";
	
	if (i > 0 && i < video.images.length) {
		current = video.images[i-1];
		next = video.images[i];
		div.style.backgroundImage = "url('" + current.image.getAttribute("src") + "')";
		next.parent.appendChild(div);
	}
}





function ani1(imageSet) {

	var tl = new TimelineLite();
		
		//Set up first, final
		firstSlideAni1(imageSet, "GREAT PRODUCT");
		imageSet.unshift("First slide");
		imageSet.push("Final slide");

		for(i = 0; i<imageSet.length; i++){
			//On first
			if (i == 0){
				tl.add(TweenLite.to($("#lay3"), 2, {width:"800px", height:"480px"}));
				tl.add(TweenMax.to(TweenMax.to($("#line"), 1.5, {delay:1, width: "0px", left: "+=400px", backgroundPosition:"0px"})));
				tl.add(TweenLite.delayedCall(-0.2, fadeElement, [$("#videoName"), "out"]));
			}
			//On final
			else if (i == imageSet.length-1){
				tl.add(TweenLite.delayedCall(1, finalSlideAni1, ['CREATOR', 'CONTACT.COM']));
				tl.add(TweenLite.to($("#lay3"), 1, {delay:1, width:"800px", height:"480px"}));
				tl.add(TweenLite.to($("#line"), 1, {delay:-0.3, width:"400px", height:"2px"}));
				tl.add(TweenLite.delayedCall(-0.2, fadeElement, [$("#videoName"), "in"]));
				tl.add(TweenLite.delayedCall(1, setVisible));

			}
			//Rest
			else{
				if (i%2 == 0) {
					tl.add(TweenLite.delayedCall(1, setImage, [imageSet[i].image.src]));
					tl.add(TweenLite.to($("#lay1"), 1.5, {width:"800px", height:"480px"}));
				}
				else{
					tl.add(TweenLite.delayedCall(1, setImage2, [imageSet[i].image.src ]));
					tl.add(TweenLite.to($("#lay2"), 1.5, {width:"800px", height:"480px"}));
				}		
			}
		}

		restoreAni1(imageSet);
}

//Helpers
function setImage(imageSrc) {
	$("#lay1").css( "width", "0px"  );
	$("#lay2").css( "z-index", "1"  );
	$("#lay1").css( "z-index", "2"  );
	$("#lay3").css( "z-index", "0"  );
	
	$("#lay1").css( "background-image", "url('" + imageSrc + "')"  );
}
function setImage2(imageSrc) {
	$("#lay2").css( "width", "0px"  );
	$("#lay1").css( "z-index", "1"  );
	$("#lay2").css( "z-index", "2"  );
	$("#lay3").css( "z-index", "0"  );
	
	$("#lay2").css( "background-image", "url('" + imageSrc + "')"  );
}
function fadeElement(element, inOrOut){
	
	if (inOrOut.localeCompare("out") == 0) {		
		$(element).fadeOut(500);
	}
	if (inOrOut.localeCompare("in") == 0) {
		$(element).fadeIn(500);
	}

}
function setVisible() {
	$("#contact").css( "visibility", "visible" );
	$("#creator").css( "visibility", "visible" );
	//$(element).css( "visibility", "visible" );
}


function finalSlideAni1(creat, cont){
	$("#lay3").css( "width", "0px"  );
	$("#lay3").css( "z-index", "3"  );
	
	$("#line").css( "left", "200px"  );
	
	//Create creator
	creator = document.createElement("h6");
	creator.innerHTML = creat;
	$(creator).attr( "id", "creator"  );
	$(creator).attr( "class", "removeTemp"  );
	$(creator).css( "position", "relative"  );
	$(creator).css( 'top', '170px'  );
	$(creator).css( "font-size", "20px"  );
	$(creator).css( "visibility", "hidden" );
	$( "#lay3" ).append(creator);
	

	//Create contact
	contact = document.createElement("h6");
	contact.innerHTML = cont;
	$(contact).attr( "id", "contact"  );
	$(contact).attr( "class", "removeTemp"  );
	$(contact).css( "position", "relative"  );
	$(contact).css( 'top', '190px'  );
	$(contact).css( "font-size", "15px"  );
	$(contact).css( "visibility", "hidden" );
	$( "#lay3" ).append(contact);
	
}

function firstSlideAni1(imageSet, vidName){
	$("#videoCont").css( "background-image", "url('" + imageSet[0].image.src + "')"  );

	//Remove from previous
	$(".removeTemp").remove();

	$("#lay3").css( "width", "800px"  );
	$("#lay3").css( "z-index", "3"  );
	$("#lay3").css( "background-color", "rgba(255, 255, 255, 0.9)"  );
	$("#lay3").css( "text-align", "center"  );
	
	//Create line
	line = document.createElement("div");
	$(line).attr( "id", "line"  );
	$(line).attr( "class", "removeTemp"  );
	$(line).css( "width", "400px"  );
	$(line).css( "height", "2px"  );
	$(line).css( "position", "relative"  );
	$(line).css( 'top', '180px'  );
	$(line).css( "left", "200px"  );
	//$(line).css( "z-index", "3"  );
	$(line).css( "background-color", "rgba(86, 86, 86, 1)"  );
	$( "#lay3" ).append(line);
	
	//Create videoName name
	videoName = document.createElement("h4");
	videoName.innerHTML = vidName;
	$(videoName).attr( "id", "videoName"  );
	$(videoName).attr( "class", "removeTemp"  );
	$(videoName).css( "position", "relative"  );
	$(videoName).css( 'top', '110px'  );
	$(videoName).css( "font-size", "40px"  );
	$( "#lay3" ).append(videoName);
}

function restoreAni1(imageSet){
	$("#lay1").css( "background-image", "none"  );
	$("#lay2").css( "background-image", "none"  );
	$("#lay3").css( "z-index", "0"  );
	
	imageSet.shift();
	imageSet.pop();
}


/* Timeline stoppas när stängknappen på previewfönster trycks */
function killTimeline(timeline, current, next) {
	$("#closeButton").on("click", function() {
		
		$("#preview").css("opacity", "0");
		
		$(current.parent).css("opacity", "0");
		$(next.parent).css("opacity", "0");
		
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
