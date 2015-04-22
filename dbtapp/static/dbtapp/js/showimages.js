function showImages(imageObject, index) {
	var nrOfPics = $('#images li').length;
	var imageUl = document.getElementById('images');
	var image = imageObject.image;
	//image.width = 200; //333
	//image.height = 200; //eller 120
	
	
	if(index >= nrOfPics) {
		var size = cropImage(image);
		var element = document.createElement('li');
		element.appendChild(image);
		var addFileDiv = document.getElementById('addFileWrapper');
		imageUl.insertBefore(element,addFileDiv);
		image.right = size.paddingLeft;
		image.top = size.paddingTop;
		image.width = size.width;
	}
}

function cropImage (image) {
    var imageRatioW = ( image.width / image.height );
    var imageRatioH = ( image.height / image.width );

    var widthScalingFactor = ( imageRatioW * 200 ) / image.width;
    var heightScalingFactor = ( imageRatioH * 200 ) / image.height;
    

    if (widthScalingFactor > heightScalingFactor) {
        var width = image.width * widthScalingFactor;
        var height = image.height * widthScalingFactor;
    } else{
        var width = image.width * heightScalingFactor;
        var height = image.height * heightScalingFactor;
    };

    var paddingLeft = ( (200 - width) / 2 );
    var paddingTop =( (200 - height) / 2 );

    return {width: width, height: height, paddingLeft: paddingLeft, paddingTop: paddingTop};
}

function openImageSetting() {
	var allImages = document.getElementById("images");
	var images = allImages.getElementsByTagName("li");
	alert("Det finns " + images.length + "st bilder!");
}

var imagePositions = {};
imagePositions.oldPos = [];
imagePositions.newPos = [];
var previewReordered = false;


function sortSlideShow(imageSet) {
	if(previewReordered) {
		for(i = 0; i < imagePositions.newPos.length; i++) {
			
			//Om nya positionen är efter gamla positionen
			if(imagePositions.newPos[i] > imagePositions.oldPos[i]) {	
			
				//Sätt in bild på ny position
				imageSet.splice(imagePositions.newPos[i], 0, imageSet[imagePositions.oldPos[i]]);
				
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
			
			/*
			tempImage = imageSet[imagePositions.newPos[i]];
			imageSet[imagePositions.newPos[i]] = imageSet[imagePositions.origPos[i]];
			imageSet[imagePositions.origPos[i]] = tempImage;
			*/
			
			//document.write("origPos:" + imagePositions.origPos[i] + " newPos:" + imagePositions.newPos[i] + "<br />");
		}
		
		previewReordered = false;
	}
	return imageSet;
}


$(document).ready(function sortImages() {
	
	$("#images").sortable({
		
		//Mjuk animering till ny position
		revert:true,
		
		start: function(event, ui) {
			imagePositions.oldPos.unshift(ui.item.index());
		},
		
		stop: function(event, ui) {
			imagePositions.newPos.unshift(ui.item.index());
			
			previewReordered = true;
		}
		
		
		/*
		//Visa kryss när element börjar dras
		start: function(event, ui){
			$("#canvasTrashCan").fadeIn(500);
		},
		
		//Återställ till vanlig position om element släpps utanför droppable
		revert : function(event, ui) {
			$(this).data("uiDraggable").originalPosition = {
				top : 0,
				left : 0
			};
			return !event;
		},
		
		//Ta bort kryss när elementet släpps
		stop: function(event, ui){
			$("#canvasTrashCan").fadeOut(500);
		}
		*/
	});
});
	
