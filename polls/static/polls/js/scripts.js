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
        var canvas = document.getElementById('slideshow');
        var context = canvas.getContext('2d');
        
        setTimeout(function(){

            $('#slideshow').click(function(){
                var nextIndex    = 0;
                
                if(video.length-1 > current){
                    nextIndex = current +1;
                }
                else {
                    nextIndex = 0;
                }
                var next = video[nextIndex];

                // This browser supports canvas, fade it into view:

                var imageRatio = ( next.width / next.height );
                var imageScaledWidth = ( imageRatio * canvas.height );
                // Show the next slide below the current one:
                context.drawImage(next, ( (canvas.width - imageScaledWidth) / 2 ), 0, imageScaledWidth, canvas.height );
                //next.show();
                current = nextIndex;
            });

        },100);
    }
}) 




