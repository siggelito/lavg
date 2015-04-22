function showImages(imageObject, index) {
	var nrOfPics = $('#images li').length;
	var imageUl = document.getElementById('images');
	var image = imageObject.image;
	image.width = 200; //333
	image.height = 200; //eller 120
	
	if(index >= nrOfPics) {
		var element = document.createElement('li');
		element.appendChild(image);
		var addFileDiv = document.getElementById('addFileWrapper');
		imageUl.insertBefore(element,addFileDiv);
	}
}

function openImageSetting() {
	var allImages = document.getElementById("images");
	var images = allImages.getElementsByTagName("li");
	alert("Det finns " + images.length + "st bilder!");
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
	
