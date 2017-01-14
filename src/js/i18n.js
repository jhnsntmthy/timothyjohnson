import * as most from 'most';
import $ from 'jquery';
import marked from 'marked';

const documentEvents = {
  addListener: (type, lsnr) => $(document).on(type, lsnr),
  removeListener: (type, lsnr) => $(document).off(type, lsnr)
}

const locale_state = {
  current_locale: 'fr',
  en: {
    'who_is_timothy_johnson': 'Who is Timothy Johnson?',
    'algorithm-home-page': '***const*** age = (x) ***=>*** x ***>=*** 40',
    'take-minute-review-flowchart': 'Take a minute to review this flow chart. We will cover the specific elements next.',
  },
  fr: {
    'who_is_timothy_johnson': 'Quien Es Timothy?',
    'algorithm-home-page': '***let*** poop = (x) ***=>*** x ***>=*** 40',
    'take-minute-review-flowchart': 'Prenez une minute pour examiner ce diagramme. Nous aborderons les éléments spécifiques suivants.',
  }
}

$(document).on('locale::set', (e, locale) => locale_state.current_locale = locale);
// 2. setup translator

const translate = (element) => {
  console.log(element)
  const $el = $(element);
  const locale = locale_state[locale_state.current_locale];
  const translatedText = locale[$el.attr('data-i18n')];
  $el
    .html(marked(translatedText))
    .attr('translated', true);
};

most.fromEvent('translatable', documentEvents)
    .map(function(params){ return params[1]; })
    .flatMap(function(elementArray){ return most.from(elementArray) })
    .tap(translate)
    .drain();

// 3. setup mutation observer

const observer = new WebKitMutationObserver(function(mutations) {
  console.log('WebKitMutationObserver')
  mutations.forEach(function(mutation) {
    $(document).trigger('translatable', [ document.querySelectorAll('[data-i18n]:not([translated])') ]);
  });
});

observer.observe(document, { attributes: true, childList: true, characterData: true, subtree: true });
