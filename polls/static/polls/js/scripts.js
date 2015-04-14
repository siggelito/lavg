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
    $("#counter_id").text("debug 1");
    $("#counter_id").css("background-color": "red");
    if (input.files && input.files[0]) {
        var reader = new FileReader();

<<<<<<< HEAD
        /*reader.onload = function (e) {
            
=======
        reader.onload = function (e) {
            $('#img_id').attr('src', e.target.result);
>>>>>>> 6ab99f025dd320edd05e4d0a9172b65d59b3f90d
            alert("hej" + video.length);
        }*/
        //alert("hej" + video.length);
        reader.readAsDataURL(input.files[0]);
        video[video.length] = input.files[0];
        alert("hej" + video.length);
        &("#counter").text(video.length);
    }
}