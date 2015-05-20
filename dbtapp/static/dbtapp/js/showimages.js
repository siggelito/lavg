function openImageSetting(elem) {
	var image = $(elem).find('#image')[0];
	var wrapper = $(elem).find('.image-wrapper');
	//alert("Vald position: " + $(image).attr('rel') + " Id: " + $(elem).attr('rel'));

	var parent = elem.parentNode;
	var newObject = elem.cloneNode(true);
	parent.parentNode.appendChild(newObject);
	var newImage = null; //$(newObject).find('.image');
	var settings = null; // = $(newObject).find('.settings');
	var settingsCloseButton = null;
	var imageWrapper = null;
	var settingsContent = null;
	var inputTextField = null;

	var form = newObject.childNodes[1];

	$(form).on('submit', function(event){
	    event.preventDefault();
	    console.log("form submitted!")  // sanity check
	    console.log($(event.target).get(0));
	    postSettingsForm(event.target);
	});

	var childs = form.childNodes;
	for (var i = 0; i < childs.length; i++) {
		if (childs[i].className == "image-wrapper") {
			imageWrapper = childs[i];
			var wrapperChilds = childs[i].childNodes;
			for (var j = 0; j < wrapperChilds.length; j++) {
				if (wrapperChilds[j].className == "image") {
					newImage = wrapperChilds[j];
					break;
				}

			}
	    }  
	    if (childs[i].className == "settings") {
			settings = childs[i];
			var settingsChilds = childs[i].childNodes;
			for (var j = 0; j < settingsChilds.length; j++) {
				if (settingsChilds[j].className == "settings-content") {
					settingsContent = settingsChilds[j];
					break;
				}

			}
	    }  
	    if (childs[i].className == "image-text-content") {  
	    	inputTextField = childs[i];
	    } 
	    if (childs[i].className == "close-btn-settings") {  
	    	settingsCloseButton = childs[i];
	    } 

	}

	var left = elem.offsetLeft;
	var top = elem.offsetTop;

	var width = $(elem).width();
	var height = $(elem).height();

	newObject.style.position = "absolute";
	newObject.style.left = left + "px";
	newObject.style.top = top + "px";
	newObject.style.listStyleType = "none";
	newObject.style.padding = "0px";
	newObject.style.zIndex = "100";
	$(settingsContent).hide();
	$(inputTextField).children().hide();
	// hide old element
	elem.style.opacity = "0";

	var windowWidth = 700;
	var windowHeight = 400;
	var size = getSize(newImage, (windowWidth*0.7), (windowHeight*0.8));

	var timeline = new TimelineLite({onReverseComplete:AfterClosedSettings, onReverseCompleteParams:[newObject, elem, parent]});
	
	timeline.add(TweenLite.to(newObject, 0.5, { 
		borderWidth: 0,
		boxShadow: "3px 5px 25px 1px #353535",
		top: "50%", 
		left: "50%", 
		width: windowWidth, 
		height: windowHeight, 
		marginLeft: "-"+(windowWidth/2)+"px",
		marginTop: "-"+(windowHeight/2)+"px",
	}), 0);
	timeline.add(TweenLite.to(imageWrapper, 0.5, { 
		width: "70%",
		height: "80%"
	}), 0);
	timeline.add(TweenLite.to(newImage, 0.5, { 
		width: size.width+"px", 
		height: size.height+"px",
		marginLeft: size.paddingLeft, 
		marginTop: size.paddingTop
	}), 0);
	timeline.add(TweenLite.to(settings, 0.1, { 
		display: "block",
		width: "30%",

	}), 0);
	timeline.add(TweenLite.to(inputTextField, 0.5, { 
		display: "table-cell",
		height: "20%"
	}), 0);
	timeline.add(TweenLite.delayedCall(0,function () {
		$(settings).children().fadeIn();
		$(inputTextField).children().fadeIn();
	}),null);

	


	settingsCloseButton.style.display = "block";
	settingsCloseButton.onclick = function() {
		$(settings).children().fadeOut();
		$(inputTextField).children().fadeOut();
		$(settingsCloseButton).hide();
		timeline.reverse();
	};
}

function AfterClosedSettings(newObj, oldObj, parent) {
	newObj.style.opacity = "0";
	oldObj.style.opacity = "1";
	newObj.parentNode.removeChild(newObj);
}


var imagePositions = {};
imagePositions.oldPos = [];
imagePositions.newPos = [];
var sortFromIndex = 0;
var previousIndex = 0;


function sortSlideShow(imageSet) {	
	
	if(previousIndex < imagePositions.newPos.length) {
		sortFromIndex = imagePositions.newPos.length - previousIndex - 1;
		previousIndex = imagePositions.newPos.length;
		
		for(i = sortFromIndex; i >= 0; i--) {
			
			//Om nya positionen är efter gamla positionen
			if(imagePositions.newPos[i] > imagePositions.oldPos[i]) {	
			
				//Sätt in bild på ny position
				imageSet.images.splice(imagePositions.newPos[i]+1, 0, imageSet.images[imagePositions.oldPos[i]]);
				
				
				//ta bort gamla bilden på sitt vanliga index
				imageSet.images.splice(imagePositions.oldPos[i], 1);
			}
			//Om nya positionen är innan gamla positionen
			else {
				
				//Sätt in bild på ny position
				imageSet.images.splice(imagePositions.newPos[i], 0, imageSet.images[imagePositions.oldPos[i]]);
				
				//ta bort gamla bilden på sitt index som är 1 större
				imageSet.images.splice(imagePositions.oldPos[i]+1, 1);
			}
		}
		
		previewReordered = false;
	}
	
	return imageSet;
}

var imageItems = [];

$(document).ready(function sortImages() {
	
	$("#images").sortable({
		
		//Mjuk animering till ny position
		revert: true,
		
		//mer än 50% av draggable bild täcker droppable bild
		tolerance: "intersect",
		
		helper: "clone",
		
		//Spara index där den börjar dras
		start: function(event, ui) {
			imagePositions.oldPos.unshift(ui.item.index());
		},
		
		//Spara index där den släpps
		stop: function(event, ui) {
			imagePositions.newPos.unshift(ui.item.index());
			var oldPos = imagePositions.oldPos[0];
			var newPos = ui.item.index()

			if (oldPos != newPos) {
				$.ajax({
					type:"POST",
					url:postURL,
					dataType: "json",
					csrfmiddlewaretoken: '{{ csrf_token }}',
					data: {
	                        'oldPos': imagePositions.oldPos[0], // from form
	                        'newPos': ui.item.index(), // from form
	                        'imgId': $(ui.item).attr('rel')
	                        },
	                success: function(){}
	            });
			}            
		}
	});
	$("#images li").on('click',function(e){
        openImageSetting(e.currentTarget);
	});

});

function postLogoForm(input){

	if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#logo-img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
	var str = postLogoURL;
	var data = new FormData($('#logo-form').get(0));
	$.ajax({ 
	    type: 'POST', 
	    url: postLogoURL, 
	    data: data,
	    cache: false,
	    processData: false,
	    contentType: false,
	    success : function(json) {
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
/*            var imgList = $('#images li'); //document.getElementById("images").childNodes;
            for (var i = 0; i < imgList.length; i++) {
            	var itemPK = parseInt($(imgList[i]).attr('rel'));
            	var photoPK = json.photo_pk;
            	if (itemPK == photoPK) {
            		var elem = $(imgList[i]).find('#post-description-text');
            		$(elem).val(json.description);
            		break;
            	}
            }*/
        },
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
    return false;
}

function postSettingsForm(form) {
    console.log("create post is working!") // sanity check
    $.ajax({
        url : form.action, // the endpoint
        type : "POST", // http method
        data : $(form).serialize(),
        dataType: "json",
		csrfmiddlewaretoken: '{{ csrf_token }}',//{
        success : function(json) {
            console.log(json); // log the returned json to the console
            console.log("success"); // another sanity check
            var imgList = $('#images li'); //document.getElementById("images").childNodes;
            for (var i = 0; i < imgList.length; i++) {
            	var itemPK = parseInt($(imgList[i]).attr('rel'));
            	var photoPK = json.photo_pk;
            	if (itemPK == photoPK) {
            		var elem = $(imgList[i]).find('#post-description-text');
            		$(elem).val(json.description);
            		break;
            	}
            }
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
};

function RemoveImage (url) {
	$.ajax({ 
	    type: 'POST', 
	    url: url, 
	    cache: false,
	    processData: false,
	    contentType: false,
	    success: function() {}
    });
    return false;
}