function showImages(imageObject, index) {
	var nrOfPics = $('#images li').length;
	var imageUl = document.getElementById('images');
	var image = imageObject.image;
	/*var images = $('#images li img');
	for (var i = 0; i < images.length; i++) {
		
		var size = getNewSize(images[i]);
		images[i].width = size.width;
		images[i].height = size.height;
		images[i].setAttribute("style", "margin-top:" + size.paddingTop.toString() + "px");
		images[i].setAttribute("style", "margin-left:" + size.paddingLeft.toString() + "px");
	}*/
	if(index >= nrOfPics) {
		//var element = document.createElement('li');
		//element.appendChild(image);
		//var addFileDiv = document.getElementById('addFileWrapper');
		//imageUl.insertBefore(element,addFileDiv);
		
		image.addEventListener('click', function () {
			openImageSetting(imageObject, index);
		});
		
	}
}

function getSize( image, width, height ) {
    var imgWidth = $(image).width();
    var imgHeight = $(image).height();
    var parentWidth = width;
    var parentHeight = height;

    var imageRatioW = ( imgWidth / imgHeight );
    var imageRatioH = ( imgHeight / imgWidth );

    var widthScalingFactor = ( imageRatioW * parentHeight ) / imgWidth;
    var heightScalingFactor = ( imageRatioH * parentWidth ) / imgHeight;
    

    if (widthScalingFactor > heightScalingFactor) {
        var width = imgWidth * widthScalingFactor;
        var height = imgHeight * widthScalingFactor;
    } else{
        var width = imgWidth * heightScalingFactor;
        var height = imgHeight * heightScalingFactor;
    };

    var paddingLeft = ( (parentWidth - width) / 2 );
    var paddingTop =( (parentHeight - height) / 2 );

    return {width: width, height: height, paddingLeft: paddingLeft, paddingTop: paddingTop};
}


function openImageSetting(elem) {
	var image = $(elem).find('#image')[0];
	var wrapper = $(elem).find('.image-wrapper');
	//alert("Vald position: " + $(image).attr('rel') + " Id: " + $(elem).attr('rel'));

	var parent = elem.parentNode;
	var newObject = elem.cloneNode(true);
	parent.appendChild(newObject);
	var newImage = $(newObject).find('#image');


	var left = elem.offsetLeft;
	var top = elem.offsetTop;

	newObject.style.zIndex = "100";
	newObject.style.position = "absolute";
	newObject.style.left = left + "px";
	newObject.style.top = top + "px";
	newObject.style.margin = "0px";
	newObject.style.listStyleType = "none";
	newObject.style.padding = "0px";
	newObject.style.overflow = "hidden";
	
	newObject.onclick = function() {cardClickedAgain(newObject, elem, newImage);};


	elem.style.opacity = "0";

	//document.body.appendChild(newObject);
	var size = getSize(image, 500, 300);

	$(newObject)
		.animate({ boxShadow: "3px 5px 25px 1px #555" }, 500, function() {
	        $(newObject).velocity({ top: "50%", left: "50%", width: "500px", height: "300px", border: "0px"}, {queue:false, duration: 500});
	        $(newImage).velocity({ width: size.width+"px", height: size.height+"px",marginLeft: size.paddingLeft, marginTop: size.paddingTop}, {queue:false, duration: 500});
		})
		.velocity({translateX: "-50%", translateY: "-50%"}, 500);
}

function cardClickedAgain(elem, old, image) {
	var left = old.offsetLeft;
	var top = old.offsetTop + 10;
	var elemWidth = old.clientWidth;
	var elemHeight = old.clientHeight;

	var size = getSize(image, elemWidth, elemHeight);

	$(elem).transition({
			width: elemWidth + "px",
			height: elemHeight + "px"
		}, 1000, function  () {
			TweenLite.to(elem, 500, {top: top + (elemHeight/2), left: left + (elemWidth/2),ease:Linear.easeNone})
			TweenLite.to(image, 500, { width: size.width, height: size.height,marginLeft: size.paddingLeft, marginTop: size.paddingTop,ease:Linear.easeNone})
//			$(elem).velocity({ top: top + (elemHeight/2) + "px", left: left + (elemWidth/2) + "px" }, {queue:false, duration: 500});
//    		$(image).velocity({ width: size.width+"px", height: size.height+"px",marginLeft: size.paddingLeft, marginTop: size.paddingTop}, {queue:false, duration: 500});
		});

	/*
	$(elem)
		.velocity({ top: top + (elemHeight/2) + "px", left: left + (elemWidth/2) + "px" }, 1000)
		.animate({ boxShadow: "0px 2px 2px 2px #A5A5A5" }, 500)
		.css( "border", "10px 0px 10px 0px" );

	$(elem)
		.queue( function(next){ 
			document.body.removeChild(elem); 
			old.style.opacity = "1";
			next(); 
		});
	*/
}


var imagePositions = {};
imagePositions.oldPos = [];
imagePositions.newPos = [];
var sortFromIndex = 0;
var previousIndex = 0;


function sortSlideShow(imageSet) {	

    var video = {
        images: [],
        intro: null,
        outro: null
    };
	
	if(previousIndex < imagePositions.newPos.length) {
		sortFromIndex = imagePositions.newPos.length - previousIndex - 1;
		previousIndex = imagePositions.newPos.length;
		
		for(i = sortFromIndex; i >= 0; i--) {
			
			//Om nya positionen är efter gamla positionen
			if(imagePositions.newPos[i] > imagePositions.oldPos[i]) {	
			
				//Sätt in bild på ny position
				imageSet.splice(imagePositions.newPos[i]+1, 0, imageSet[imagePositions.oldPos[i]]);
				
				//ta bort gamla bilden på sitt vanliga index
				imageSet.splice(imagePositions.oldPos[i], 1);
			}
			//Om nya positionen är innan gamla positionen
			else {
				
				//Sätt in bild på ny position
				imageSet.splice(imagePositions.newPos[i], 0, imageSet[imagePositions.oldPos[i]]);
				
				//ta bort gamla bilden på sitt index som är 1 större
				imageSet.splice(imagePositions.oldPos[i]+1, 1);
			}
		}
		
		previewReordered = false;
	}
	
	return imageSet;
}

var imageItems = [];

$(document).ready(function sortImages() {
	
	$("#images").sortable({
		
		//Mjuk animering till ny position
		revert: true,
		
		//mer än 50% av draggable bild täcker droppable bild
		tolerance: "intersect",
		
		helper: "clone",
		
		//Spara index där den börjar dras
		start: function(event, ui) {
			imagePositions.oldPos.unshift(ui.item.index());
		},
		
		//Spara index där den släpps
		stop: function(event, ui) {
			imagePositions.newPos.unshift(ui.item.index());
			//alert("stop: " + ui.item.index() + " oldPos: " + imagePositions.oldPos[0] + " rel: " + $(ui.item).attr('rel'));
			
            $.ajax({
                 type:"POST",
                 url:postURL,
                 dataType: "json",
                 csrfmiddlewaretoken: '{{ csrf_token }}',
                 data: {
                        'oldPos': imagePositions.oldPos[0], // from form
                        'newPos': ui.item.index(), // from form
                        'imgId': $(ui.item).attr('rel')
                        },
                success: function(){
                    window.location.reload();
                }
            });
		}
	});
	$("#images li").on('click',function(e){
        openImageSetting(e.currentTarget);
	});
});

function postLogoForm(e){
	var str = postLogoURL;
	var data = new FormData($('#logo-form').get(0));
	$.ajax({ 
	    type: 'POST', 
	    url: postLogoURL, 
	    data: data,
	    cache: false,
	    processData: false,
	    contentType: false,
	    success: function() {}
    });
    return false;

}
