$(document).ready(function(){ 
    var video = {
        images: [],
        intro: null,
        outro: null
    };
    var slideshow = document.getElementById('slideshow');
    var input = document.getElementById('input');
    var inputLogo = document.getElementById('input-logo');
    //input.addEventListener('change', handleFiles);
	
	if(inputLogo != null) {
		inputLogo.addEventListener('change', postLogoForm);
	}
    var sources = [];
    var sourceLogo;
    var offset = 0;

    function initializeVideo () {
        var list = $('#preview ul li');
        var images = $('#preview ul li img');
        video.intro = {
            transition: function(first, timeline, transitionLength){
                startAnimation(first, timeline, transitionLength);
            },
            transitionLength: 1,
            effectLengt: 2, 
            wrapper: list[0]
        } 
        $(list[0]).css("opacity", "0");
        var i;
        for(i = 0; i < images.length; i++) { 
            var imgSettings = {
                transition: function(current, next, timeline, transitionLength){
                    simpleTransition(current, next, timeline, transitionLength);
                },
                effect: function(current, timeline, effectLength){
                    simpleTransition(current, timeline, effectLength);
                },
                transitionLength: 2, //(Math.floor((Math.random() * 4) + 2) * 1000)
                effectLength: 2,
                image: images[i],
                wrapper: list[i+1]
            };
            video.images[i] = imgSettings;

            /*
            var size = calcSize(slideshow, images[i]);

            img.width = size.width;
            img.height = size.height;
            $(img).css( "margin-top", size.paddingTop, "margin-left", size.paddingLeft );
            //layers[0].style.top = size.paddingTop + "px";
            //layers[0].style.left = size.paddingLeft;

            img.width = slideshow.scrollWidth;
            img.height = slideshow.scrollHeight;
            */
            $(list[i+1]).css("opacity", "0");
            
            oneLoadedFile(video.images[i], i);
        }

        video.outro = {
            transition: function(last, outro, timeline, transitionLength){
                endAnimation(last, outro, timeline, transitionLength);
            },
            transitionLength: 1,
            effectLengt: 2,
            wrapper: list[i+1]
        } 
        $(list[i+1]).css("opacity", "0");



        doneLoadingFiles(video);
    }

    initializeVideo();

    

    /*
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
                
                oneLoadedFile(imageSet[offset + i], offset + i);

                
            };
            doneLoadingFiles(imageSet);
        });       
    }
    */
    
}) 

function calcSize( canvas, image ) {
    var imageRatioW = ( image.naturalWidth / image.naturalHeight );
    var imageRatioH = ( image.naturalHeight / image.naturalWidth );

    var widthScalingFactor = ( imageRatioW * canvas.scrollHeight ) / image.naturalWidth;
    var heightScalingFactor = ( imageRatioH * canvas.scrollWidth ) / image.naturalHeight;
    

    if (widthScalingFactor > heightScalingFactor) {
        var width = image.naturalWidth * widthScalingFactor;
        var height = image.naturalHeight * widthScalingFactor;
    } else{
        var width = image.naturalWidth * heightScalingFactor;
        var height = image.naturalHeight * heightScalingFactor;
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


$(window).load(function(){
    var images = $('#images li img');

    for (var i = 0; i < images.length; i++) {
		
		var size = getNewSize(images[i]);
        images[i].width = size.width;
        images[i].height = size.height;
        images[i].setAttribute("style", "margin-top:" + size.paddingTop.toString() + "px");
        images[i].setAttribute("style", "margin-left:" + size.paddingLeft.toString() + "px");
    
    }
});
