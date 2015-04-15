$(document).ready(function(){ 
    var video = new Array();

    var input = document.getElementById('input');
    input.addEventListener('change', handleFiles);

    function handleFiles(e) {
        
        var img = new Image;
        img.src = URL.createObjectURL(e.target.files[0]);

        for (var i = e.target.files.length - 1; i >= 0; i--) {
            var img = new Image;
            img.src = URL.createObjectURL(e.target.files[i]);
            video[video.length] = img;
        };
        alert("nr of files: " + video.length);

        var current = 0;
        var nextIndex = 0;
        var canvas = document.getElementById('slideshow');
        var context = canvas.getContext('2d');
        var isRunning = false;
        
        setTimeout(function(){

            $(canvas).click(function(){

                if(video.length-1 > current){
                    nextIndex = current +1;
                }
                else {
                    nextIndex = 0;
                }
                var next = video[nextIndex];

                $(canvas).fadeOut(800,function() {

                    var size = calcSize(canvas, next);
                    var width = size[0];
                    var height = size[1];

                    context.drawImage(next, ( (canvas.width - width) / 2 ), ( (canvas.height - height) / 2 ), width, height );
                    $(canvas).fadeIn(400);
                    current = nextIndex;
                });
            });

        },100);
    }
}) 

function calcSize( canvas, image ) {
    var imageRatio = ( image.width / image.height );

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






