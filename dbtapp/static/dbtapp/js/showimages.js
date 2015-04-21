function showImages(imageObject) {
	var imageDiv = document.getElementById('images');
	var image = imageObject.image;
	image.width = 200;
	image.height = 200;
	imageDiv.appendChild(image);
}