/* eslint-env browser, jquery */
import $ from 'jquery';

let progress = { pages: {}, lastPage: null };

$(document).trigger('activity::setup', [ progress ]);

const updateNav = function(prog){
  Object.keys(prog.pages).forEach(function(slug){
    $('li').children('[data-nav="'+slug+'"]')
            .children('i')
            .removeClass('fa-circle-thin fa-question-circle-o')
            .addClass('fa')
            .addClass('green-txt fa-check-circle animated bounce');
  })
};

const updateProgress = function(slug){
  progress['pages'][slug] = 'visited';
  progress['currentPage'] = slug;
  progress['lastPage'] = slug;
  updateNav(progress);
};

const resumeProgress = (state) => {
  $(document).trigger('hucklebuck', [state['lastPage']]);
  progress = state;
  updateNav(progress);
}
$(document).on('hucklebucked', (e, slug) => updateProgress(slug));

$(document).on('resumeProgress', (e, state) => resumeProgress(state));

export default null;
