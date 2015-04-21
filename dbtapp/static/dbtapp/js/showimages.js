function showImages(image) {
	var imageDiv = document.getElementById('images');
	image.width = 200;
	image.height = 200;
	imageDiv.appendChild(image);
}