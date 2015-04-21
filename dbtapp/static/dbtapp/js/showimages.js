function showImages(imageObject, index) {
	var nrOfPictures = imageUl.getElementsByTagName('li').length;
	var imageUl = document.getElementById('images');
	var image = imageObject.image;
	image.width = 200;
	image.height = 200;
	
	if(index > nrOfPictures - 1) {
		var element = documentElement.createElement('li');
		imageUl.appendChild(element);
		element.appendChild(image);
	}
}