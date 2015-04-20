
$(document).ready(function(){ 
    var video = [];
    var slideshow = document.getElementById('slideshow');
    var input = document.getElementById('input');
    input.addEventListener('change', handleFiles);

    function handleFiles(e) {

        var sources = [];

        for (var i = e.target.files.length - 1; i >= 0; i--) {
            
            sources[i] = URL.createObjectURL(e.target.files[i]);

            content = new Object();
            content.canvas = document.createElement('canvas');
            video[video.length] = content;

            var element = document.createElement("li");

            element.appendChild(content.canvas);
            slideshow.appendChild(element);
        }

        loadImages(sources, function(images) {
            for (var i = 0; i <= images.length - 1; i++) {
                
                video[i].image = images[i];

                var canvas = video[i].canvas;
                var image = video[i].image;

                var size = calcSize(canvas, image);
                var width = size[0];
                var height = size[1];

                var context = canvas.getContext('2d');
                context.drawImage(image, ( (canvas.width - width) / 2 ), ( (canvas.height - height) / 2 ), width, height );  
            };
            video = images;
        });

        slideshow = $("#slideshow li");
    }
}) 

function calcSize( canvas, image ) {
    var imageRatio = ( image.width / image.height );
    var withcanv = canvas.width;
    var withimg = image.width;
    var heightcanv = canvas.height;
    var heigthimg = image.height;
    var widthScalingFactor = ( imageRatio * canvas.height ) / image.width;
    var heightScalingFactor = ( canvas.width / imageRatio ) / image.height;

    if (widthScalingFactor > heightScalingFactor) {
        var width = image.width * widthScalingFactor;
        var height = image.height * widthScalingFactor;
    } else{
        var width = image.width * heightScalingFactor;
        var height = image.height * heightScalingFactor;
    };

    return [width, height];
}

function loadImages(sources, callback) {
    var images = [];
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}


