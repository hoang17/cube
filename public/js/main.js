$(document).ready(function(){

  // var prev = 0, offset = $('.navbar').height()

  $(window).scroll(function () {

    // var cur = $(this).scrollTop()
    // if (cur > offset) {
    //   if (cur > prev)
    //     $('.navbar').fadeOut()
    //   else
    //     $('.navbar').fadeIn()
    // }
    // prev = cur

    if ($(this).scrollTop() > 30) {
        $('.navbar').fadeOut()
    } else {
        $('.navbar').fadeIn()
    }
  })
})
