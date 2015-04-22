

$(document).ready(function(){ 
    var imageSet = [];
    var slideshow = document.getElementById('slideshow');
    var input = document.getElementById('input');
    var inputLogo = document.getElementById('input-logo');
    input.addEventListener('change', handleFiles);
    inputLogo.addEventListener('change', handleLogoFile);
    var sources = [];
    var sourceLogo;

    function handleLogoFile (e) {
        if (e.target.files.length > 0) {
            sourceLogo = URL.createObjectURL(e.target.files[0]);

            var element = document.createElement("li");

            slideshow.appendChild(element);

            loadSingleImage(sourceLogo, function (image) {
                element.appendChild(image);
                image.id = "logo-image";
            });

        };
    };

    function handleFiles(e) {
        
        if (sources.length != 0) {
            offset = sources.length;
        } else {
            offset = 0;
        }

        for (var i = 0; i < e.target.files.length; i++) {
            
            sources[offset + i] = URL.createObjectURL(e.target.files[i]);

            var layerContent = {
                layerOne: document.createElement('canvas'),
                layerTwo: document.createElement('canvas')
            };
            
            layerContent.layerOne.className = "layerOne";
            layerContent.layerTwo.className = "layerTwo";


            var settings = {
                transition: function(current, next){
                    simpleTransition(current, next);
                },
                duration: 2000
            };
            layerContent.settings = settings;

            imageSet[offset + i] = layerContent;

            var element = document.createElement("li");
            element.appendChild(layerContent.layerOne);
            element.appendChild(layerContent.layerTwo);
            slideshow.appendChild(element);
        }

        loadImages(sources, function(images) {
            for (var i = 0; i < images.length; i++) {
                
                imageSet[i].image = images[i];

                var layerOne = imageSet[i].layerOne;
                var image = imageSet[i].image;

                layerOne.width = layerOne.scrollWidth;
                layerOne.height = layerOne.scrollHeight;

                var size = calcSize(layerOne, image);

                var context = layerOne.getContext('2d');
                context.drawImage(image, size.paddingLeft, size.paddingTop, size.width, size.height); //, paddingLeft, paddingTop, width, height  
                $(imageSet[i].layerOne).hide();
                
                oneLoadedFile(imageSet[i], i);
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


