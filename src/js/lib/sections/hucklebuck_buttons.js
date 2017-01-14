import $ from 'jquery';

$(document).on('click','[data-nav]', function(event){
  var next = $(event.target).closest('[data-nav]').attr('data-nav');
  $(document).trigger('hucklebuck', [next]);
});

$(document).on('click','#next-up', function(event){
  var next = $(event.target).attr('data-next-up');
  $(document).trigger('hucklebuck', [next]);
});

$(document).on('click', '.cust-btn', function(event){
  var $target = $(event.currentTarget);
  var next = $target.attr('data-target');
  $(document).trigger('hucklebuck', [next]);
});

$(document).on('click', '.trigger-next', function(event){
  if(progress['currentPage'] === 'page1'){
    $(document).trigger('hucklebuck', ['page2']);
  } else if(progress['currentPage'] === 'page2'){
    $(document).trigger('hucklebuck', ['page3']);
  }
});
$(document).on('click', '.trigger-back', function(event){
  if(progress['currentPage'] === 'page4'){
    $(document).trigger('hucklebuck', ['page3']);
  } else if(progress['currentPage'] === 'page3'){
    $(document).trigger('hucklebuck', ['page2']);
  } else if(progress['currentPage'] === 'page2'){
    $(document).trigger('hucklebuck', ['page1']);
  }
});

$(document).on('touchstart', 'a', function(event){
  $(event.target).trigger('click')
});
