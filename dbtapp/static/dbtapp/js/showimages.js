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