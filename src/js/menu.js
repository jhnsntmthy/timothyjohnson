/* eslint-env browser, jquery */
import $ from 'jquery';

$(document).ready(() => {
  $('.click-toggle-menu').click(() => {
    $('.overlay').fadeToggle(200);
    $(this).toggleClass('btn-open').toggleClass('btn-close');
  });
});
$('.overlay').on('click', () => {
  $('.overlay').fadeToggle(200);
  $('.button a').toggleClass('btn-open').toggleClass('btn-close');
});
