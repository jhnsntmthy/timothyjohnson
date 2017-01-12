/* eslint-env browser, jquery */
import $ from 'jquery';

const scrollToTop = (immediately = false) => {
  console.log('scroll-to-top ', immediately ? 'now' : 'slowly');
  if (immediately) {
    $('html,body').scrollTop(0);
  } else {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  }
  $(document).trigger('home-height');
  $(document).trigger('scrolled-to-top');
}

$(document).on('click', '#scroll-to-top', function(){
  scrollToTop();
})

$(document).on('scroll-to-top', () => scrollToTop());

$(document).on('hucklebucked', () => $(document).trigger('scroll-to-top', [true]));
