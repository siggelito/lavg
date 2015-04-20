function showImage() {
	var imageDiv = document.getElementById('images');
	var html = '';
	for (var i=0; i < imageSet.length; i++) {
		html+='<div><canvas>'+imageSet[i].canvas+'</canvas></div>';
	}
	imageDiv.innerHTML += html;
	
});