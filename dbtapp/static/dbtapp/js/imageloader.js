


$(document).ready(function(){ 
    var imageSet = [];
    var slideshow = document.getElementById('slideshow');
    var input = document.getElementById('input');
    input.addEventListener('change', handleFiles);
    var sources = [];

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

                var size = calcSize(layerOne, image);
                var width = size[0];
                var height = size[1];
                var paddingLeft = ( (layerOne.scrollWidth - width) / 2 );
                var paddingTop =( (layerOne.scrollHeight - height) / 2 );

                var context = layerOne.getContext('2d');
                context.drawImage(imageSet[i].image, paddingLeft, paddingTop, width, height );  
                $(imageSet[i].layerOne).hide();
                
                oneLoadedFile(imageSet[i], i);
            };
        });       
    }
    doneLoadingFiles(imageSet);
}) 

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


