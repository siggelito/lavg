var imageSet = [];


$(document).ready(function(){ 
	var slideshow = document.getElementById('slideshow');
    var input = document.getElementById('input');
    input.addEventListener('change', handleFiles);

    function handleFiles(e) {

        var sources = [];

        for (var i = 0; i < e.target.files.length; i++) {
            
            sources[sources.length] = URL.createObjectURL(e.target.files[i]);

            content = new Object();
            content.canvas = document.createElement('canvas');
            imageSet[imageSet.length] = content;

            var element = document.createElement("li");

            element.appendChild(content.canvas);
            slideshow.appendChild(element);
        }

        loadImages(sources, function(images) {
            for (var i = 0; i < images.length; i++) {
                
                imageSet[i].image = images[i];

                var canvas = imageSet[i].canvas;
                var image = imageSet[i].image;

                var size = calcSize(canvas, image);
                var width = size[0];
                var height = size[1];
                var paddingLeft = ( (canvas.scrollWidth - width) / 2 );
                var paddingTop =( (canvas.scrollHeight - height) / 2 );
                //var image2 = image;
                //image2.width = width;
                //image2.height = height;

                var context = canvas.getContext('2d');
                context.drawImage(imageSet[i].image, paddingLeft, paddingTop, width, height );  
                $(imageSet[i].canvas).hide();
                showImages(image);
            };

        });
		
        var startButton = document.getElementById("start-button");
        $(startButton).show();        
    }
}) 

function runSlideShow(current) {
    if (current != 0) {
        transition(imageSet[current-1].canvas, imageSet[current].canvas);
        
    } else {
        $(imageSet[current].canvas).show();
    }
    current++;

    if (current < imageSet.length) {
        setTimeout(function(){runSlideShow(current)}, 1000);
    } else {
        setTimeout(function() {
            $(imageSet[current-1].canvas).hide();
        }, 1000);
        
    }
    
}

function transition(current, next) {
    $(current).hide();
    $(next).show();
}

function calcSize( canvas, image ) {
    var imageRatio = ( image.width / image.height );
    var withcanv = canvas.scrollWidth;
    var withimg = image.width;
    var heightcanv = canvas.scrollHeight;
    var heigthimg = image.height;
    var widthScalingFactor = ( imageRatio * canvas.scrollHeight ) / image.width;
    var heightScalingFactor = ( canvas.scrollWidth / imageRatio ) / image.height;

    if (widthScalingFactor > heightScalingFactor) {
        var width = image.width * widthScalingFactor;
        var height = canvas.scrollHeight;
    } else{
        var width = canvas.scrollWidth;
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


