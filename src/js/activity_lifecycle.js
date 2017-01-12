/* eslint-env browser, jquery */
import $ from "./jq_setup";

$(document).on('activity::setup', function(event, state){
  $(document).on('hucklebucked', function(event, contentId){
    if(contentId === 'page3'){
    } else if(contentId === 'page4'){
    } else if(contentId === 'page5'){
    } else if(contentId === 'page6'){
    } else {}
  });
});

$(document).on('activity::breakdown', function(event, state){
  // $(document).trigger('tincan::storeAttemptState', [ state ]);
});

$(document).on('activity::ready', function(){

});

export default $;
