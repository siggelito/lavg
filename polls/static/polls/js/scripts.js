var video = new Array();
function readURL(input) {
    if (input.files && input.files[0]) {
        
        var reader = new FileReader();
        
        reader.onload = function (e) {
            
            $('#preview').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]);
        video[video.length] = input.files[0];
        alert("hej" + video.length);
    }
}
    
$("#imgInp1").change(function(){
    alert("hej");
    readURL(this);
});
$("#imgInp2").change(function(){
    readURL(this);
});

function upload_img(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        /*reader.onload = function (e) {
            
            alert("hej" + video.length);
        }*/
        //alert("hej" + video.length);
        reader.readAsDataURL(input.files[0]);
        video[video.length] = input.files[0];
        alert("hej" + video.length);
        &("#counterText").text(video.length);
    }
}