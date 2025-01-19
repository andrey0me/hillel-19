$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 2000,
      values: [ 39, 1230 ],
      slide: function( event, ui ) {
        $( "#slider-amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#slider-amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );

  const btn = document.querySelector('.js-mobile-menu-btn');
  const menu = document.querySelector('.js-mobile-menu');

  btn.addEventListener("click", (e) => {

    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      menu.classList.remove("active");
    } else {
      btn.classList.add("active");
      menu.classList.add("active");
    }
  });