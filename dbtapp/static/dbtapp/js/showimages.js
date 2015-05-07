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

function getNewSize (image) {
    var imageRatioW = ( image.naturalWidth / image.naturalHeight );
    var imageRatioH = ( image.naturalHeight / image.naturalWidth );

    var widthScalingFactor = ( imageRatioW * 200 ) / image.naturalWidth;
    var heightScalingFactor = ( imageRatioH * 200 ) / image.naturalHeight;
    

    if (widthScalingFactor > heightScalingFactor) {
        var width = image.naturalWidth * widthScalingFactor;
        var height = image.naturalHeight * widthScalingFactor;
    } else{
        var width = image.naturalWidth * heightScalingFactor;
        var height = image.naturalHeight * heightScalingFactor;
    };

    var paddingLeft = ( (200 - width) / 2 );
    var paddingTop =( (200 - height) / 2 );

    return {width: width, height: height, paddingLeft: paddingLeft, paddingTop: paddingTop};
}

function openImageSetting(imageObject, index) {

	var canvasList = document.getElementById("images").childNodes;
	var element = canvasList[index + 1]
	alert("Vald index: " + index + " Number of elements: " + canvasList.length);

	var imageRectangle = element.getBoundingClientRect();
	var left = imageRectangle.left;
	var height = imageRectangle.top;

	var newObject = element.cloneNode(true);


	newObject.style.zIndex = "100";
	newObject.style.position = "absolute";
	newObject.style.left = left + "px";
	newObject.style.top = top + "px";
	newObject.style.margin = "0px";

	canvasList.appendChild(newObject);

	element.style.opacity = "0";


}

var imagePositions = {};
imagePositions.oldPos = [];
imagePositions.newPos = [];
var sortFromIndex = 0;
var previousIndex = 0;


function sortSlideShow(imageSet) {	
	
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
		}
		
	});
});