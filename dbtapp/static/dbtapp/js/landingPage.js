/*
Smooth transition between sectons.
*/
jQuery(document).ready(function($) {

  $(".scroll").click(function(event){   
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 300, 'swing');
  });
});

/* Scrolleffekt för "Skapa din video!"*/
jQuery(document).ready(function($) {

  $(".navbar-brand").click(function(event){   
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 300, 'swing');
  });
});


/* Scroll-test 2 */
$(window).scroll(function(){

  var scroll = $(window).scrollTop();

  if (scroll > 0 ) {
    $(".navbar").addClass('scrolled');
  }

  if (scroll <= 0 ) {
    $(".navbar").removeClass('scrolled');
 }

});

/* TEST: Ändra menyn när man scrollar (med övergångar) */
/*$(window).scroll(function() {

  var scroll_pos = window.pageYOffset;
  if(scroll_pos>=40) {
      $( ".navbar" ).animate({
        fontSize: '13px',
                backgroundColor: '#2B2B2B'

  }, 50, function() {
  });
}

  else
  {
    $( ".navbar" ).animate({
              fontSize: '16px',
        backgroundColor: 'transparent'

  }, 100, function() {
  });
  }
});*/ 

/*
Change in navbar colour and fontsize when scrolling down.

*/
/*$(window).scroll(function() {

  var scroll_pos = window.pageYOffset;
  if(scroll_pos>=40) {
    $(".navbar").css("background-color","#2B2B2B").css("font-size", "13px");
  }

  else
  {
    $(".navbar").css("background-color","transparent").css("font-size", "16px");
  }
}); */