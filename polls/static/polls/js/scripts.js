function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);








function upload_img(input) {
    $("#counter_id").text("debug 1");
    $("#counter_id").css("background-color", "red");
    
    alert($('#files').get(0));
    alert($('#files').get(1));
    
    if (input.files /*&& input.files[0]*/) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#img_1').attr('src', e.target.result);
            $('#img_2').attr('src', e.target.result);

            alert("hej" + video.length);
        }
        //alert("hej" + video.length);
        reader.readAsDataURL(input.files[0]);
        //video[video.length] = input.files[0];
        //alert("hej" + video.length);
       $("#counter").text(video.length);
       
       
       
       
        
       
       
       
       
    }
}