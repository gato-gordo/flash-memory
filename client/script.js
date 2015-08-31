$(document).on('ready', function(){
  $('.card.back').hide();
  $('.card').on('click', function(){
    $('.back, .front').toggle();
  });
});
