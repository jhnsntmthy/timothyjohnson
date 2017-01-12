import $ from "./jq_setup";

/*
  ___       _   _       _ _                 _____      _
 / _ \     | | (_)     (_) |          _ _  /  ___|    | |
/ /_\ \ ___| |_ ___   ___| |_ _   _  (_|_) \ `--.  ___| |_ _   _ _ __
|  _  |/ __| __| \ \ / / | __| | | |        `--. \/ _ \ __| | | | '_ \
| | | | (__| |_| |\ V /| | |_| |_| |  _ _  /\__/ /  __/ |_| |_| | |_) |
\_| |_/\___|\__|_| \_/ |_|\__|\__, | (_|_) \____/ \___|\__|\__,_| .__/
                               __/ |                            | |
                              |___/                             |_|
                              & breakdown
*/
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

/*
  ___       _   _       _ _                ______               _
 / _ \     | | (_)     (_) |          _ _  | ___ \             | |
/ /_\ \ ___| |_ ___   ___| |_ _   _  (_|_) | |_/ /___  __ _  __| |_   _
|  _  |/ __| __| \ \ / / | __| | | |       |    // _ \/ _` |/ _` | | | |
| | | | (__| |_| |\ V /| | |_| |_| |  _ _  | |\ \  __/ (_| | (_| | |_| |
\_| |_/\___|\__|_| \_/ |_|\__|\__, | (_|_) \_| \_\___|\__,_|\__,_|\__, |
                               __/ |                               __/ |
                              |___/                               |___/
*/

$(document).on('activityReady', function(){


  var slides = $('[data-type="slide"]').map(function(index, element){
    return { name: $(element).attr('data-name'), id: $(element).attr('id')}
  });

  slides.each(function(index, slide){
    $('#mount-list').append('<li class="cust-btn" data-target="'+slide.id+'"><i></i> ' + slide.name + '</li>')
  });

	var progress = { pages: {}, lastPage: null };

  $(document).trigger('activity::setup', [ progress ]);

	var updateNav = function(){
    console.log
		Object.keys(progress.pages).forEach(function(slideId){
  		$('li').children('[data-nav="'+slideId+'"]').children('i').removeClass('fa-circle-thin fa-question-circle-o').addClass('fa').addClass('green-txt fa-check-circle animated bounce')
		})
	};

	var updateProgress = function(contentId){
		progress['pages'][contentId] = 'visited';
    progress['currentPage'] = contentId;
		progress['lastPage'] = contentId;
		updateNav();
	};

	var swapContent = function(newContentId){
		$('#content').html($('#' + newContentId).html())
	};

  var hucklebuck = function(contentId){
    swapContent(contentId);
    updateProgress(contentId);
    $(document).trigger('hucklebucked', [contentId]);
    $('html,body').scrollTop(0);
    $(document).trigger('home-height');
    $(document).trigger('post-hucklebucked', [contentId]);
  };

  hucklebuck('page1');

  $(document).on('hucklebuck', function(event, contentId){
    hucklebuck(contentId)
  });

  $(document).on('resumeProgress', function(e, resumedCompletionState){
    hucklebuck(resumedCompletionState['lastPage']);
    progress = resumedCompletionState;
    updateNav();
  });

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
    var contentId = $target.attr('data-target');
    hucklebuck(contentId);
  });

  $(document).on('click', '.trigger-next', function(event){
    if(progress['currentPage'] === 'page1'){
      hucklebuck('page2')
    } else if(progress['currentPage'] === 'page2'){
      hucklebuck('page3')
    }
  });
  $(document).on('click', '.trigger-back', function(event){
    if(progress['currentPage'] === 'page4'){
      hucklebuck('page3')
    } else if(progress['currentPage'] === 'page3'){
      hucklebuck('page2')
    } else if(progress['currentPage'] === 'page2'){
      hucklebuck('page1')
    }
  });

  $(document).on('touchstart', 'a', function(event){
    $(event.target).trigger('click')
  });

	$(document).on('click','#trump', function(event){
		$(document).trigger('tincan::complete');
		window.close()
	});

	window.onbeforeunload = function(event) {
    $(document).trigger('activity::breakdown', [ progress ]);
    return null;
	};

  $(document).on('click', '#scoll-to-top', function(){
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  })

});


export default $;
