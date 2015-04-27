

$(document).ready(function(){ 
    var imageSet = [];
    var slideshow = document.getElementById('slideshow');
    var input = document.getElementById('input');
    var inputLogo = document.getElementById('input-logo');
    input.addEventListener('change', handleFiles);
    inputLogo.addEventListener('change', handleLogoFile);
    var sources = [];
    var sourceLogo;
    var offset = 0;

    function handleLogoFile (e) {
        if (e.target.files.length > 0) {

            sourceLogo = URL.createObjectURL(e.target.files[0]);

            var imageElement = document.getElementById('logo-image');

            if( imageElement != null) {

                loadSingleImage(sourceLogo, function (image) {
                    imageElement.src = image.src;
                });
            } else {
                var element = document.createElement("div");
                slideshow.appendChild(element);
                loadSingleImage(sourceLogo, function (image) {
                    element.appendChild(image);
                    image.id = "logo-image";
                });
            }
        };
    };

    function handleFiles(e) {
        
        if (sources.length != 0) {
            offset = offset + sources.length;
            sources = [];
        }

        for (var i = 0; i < e.target.files.length; i++) {
            
            sources[i] = URL.createObjectURL(e.target.files[i]);

            var layers = [
                document.createElement('canvas'),
                document.createElement('canvas')
            ];

            layers[0].className = "layer";
            layers[0].style.zIndex = 1;

            layers[1].className = "layer";
            layers[1].style.zIndex = 2;

            var settings = {
                transition: function(current, next){
                    simpleTransition(current, next);
                },
                duration: 2000 //(Math.floor((Math.random() * 4) + 2) * 1000)
            };

            var layerContent = {
                layers: layers,
                settings: settings
            }; 

            imageSet[offset + i] = layerContent;

            var element = document.createElement("li");
            element.appendChild(layerContent.layers[0]);
            element.appendChild(layerContent.layers[1]);
            slideshow.appendChild(element);
        }

        loadImages(sources, function(images) {
            for (var i = 0; i < images.length; i++) {
                
                imageSet[offset + i].image = images[i];

                var layerOne = imageSet[offset + i].layers[0];
                var layerTwo = imageSet[offset + i].layers[1];
                var image = imageSet[offset + i].image;

                layerOne.width = layerOne.scrollWidth;
                layerOne.height = layerOne.scrollHeight;

                layerTwo.width = layerTwo.scrollWidth;
                layerTwo.height = layerTwo.scrollHeight;

                var size = calcSize(layerOne, image);

                var context = layerOne.getContext('2d');
                context.drawImage(image, size.paddingLeft, size.paddingTop, size.width, size.height); //, paddingLeft, paddingTop, width, height  
				
				$(imageSet[offset + i].layers).hide();
				
                //$(imageSet[offset + i].layers).hide();
                //$(imageSet[offset + i].layers[1]).hide();
                
                oneLoadedFile(imageSet[offset + i], offset + i);
            };
            doneLoadingFiles(imageSet);
        });       
    }
    
}) 

function calcSize( canvas, image ) {
    var imageRatioW = ( image.width / image.height );
    var imageRatioH = ( image.height / image.width );

    var widthScalingFactor = ( imageRatioW * canvas.scrollHeight ) / image.width;
    var heightScalingFactor = ( imageRatioH * canvas.scrollWidth ) / image.height;
    

    if (widthScalingFactor > heightScalingFactor) {
        var width = image.width * widthScalingFactor;
        var height = image.height * widthScalingFactor;
    } else{
        var width = image.width * heightScalingFactor;
        var height = image.height * heightScalingFactor;
    };

    var paddingLeft = ( (canvas.scrollWidth - width) / 2 );
    var paddingTop =( (canvas.scrollHeight - height) / 2 );

    return {width: width, height: height, paddingLeft: paddingLeft, paddingTop: paddingTop};
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

function loadSingleImage(source, callback) {
    var image;

    image = new Image();
    image.onload = function() {
        callback(image);
    };
    image.src = source;
}


