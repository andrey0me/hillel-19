$('.js-ideas-slider').slick({
  dots: false,
  infinite: false,
  arrows: false,
  speed: 200,
  slidesToShow: 2,
  centerMode: false,
  variableWidth: true,
  mobileFirst: true
});

$('.js-team-slider').slick({
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  arrows: false,
  speed: 200
});
