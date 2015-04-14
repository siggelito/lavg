$(document).ready(function(){ 
    var video = new Array();

    var input = document.getElementById('input');
    input.addEventListener('change', handleFiles);

    function handleFiles(e) {
        
        var img = new Image;
        img.src = URL.createObjectURL(e.target.files[0]);

        /* To render the image in canvas do: */
        var ctx = document.getElementById('canvas').getContext('2d');
        img.onload = function() {
            ctx.drawImage(img, 20,20);
            alert('the image is drawn');
        }
        /*end*/

        /* Append image to video array */
        video[video.length] = img;
        alert(video.length);
    }
}) 
