function showImages(imageObject, index) {
	var nrOfPics = $('#imageUl li').length;
	var imageUl = document.getElementById('images');
	var image = imageObject.image;
	image.width = 200;
	image.height = 200;
	
	if(index >= nrOfPics) {
		var element = document.createElement('li');
		element.appendChild(image);
		imageUl.appendChild(element);
	}
}