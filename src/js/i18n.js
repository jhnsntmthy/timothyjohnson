/* eslint-env browser, jquery */
import * as most from 'most';
import $ from 'jquery';
import marked from './marked';

const { WebKitMutationObserver } = window;

const documentEvents = {
  addListener: (type, lsnr) => $(document).on(type, lsnr),
  removeListener: (type, lsnr) => $(document).off(type, lsnr),
};

const locale_state = {
  current_locale: 'fr',
  en: {
    'who-is-timothy-johnson': 'Who is Timothy Johnson?',
    'algorithm-home-page': '***const*** age = (x) ***=>*** x ***>=*** 40',
    'take-minute-review-flowchart': 'Take a minute to review this flow chart. We will cover the specific elements next.',
    'menu-where-downloadable-resources-live': 'This is where downloadable resources will live for each course.',
  },
  fr: {
    'who-is-timothy-johnson': 'Quien Es Timothy?',
    'algorithm-home-page': '***let*** poop = (x) ***=>*** x ***>=*** 40',
    'take-minute-review-flowchart': 'Prenez une minute pour examiner ce diagramme. \n\nNous aborderons les éléments spécifiques suivants.',
    'menu-where-downloadable-resources-live': 'C\'est ici que Les ressources téléchargeables vivront pour chaque cours.',
  },
  es: {
    'who-is-timothy-johnson': 'Quien Es Timothy?',
    'algorithm-home-page': '***let*** poop = (x) ***=>*** x ***>=*** 40',
    'take-minute-review-flowchart': 'Prenez une minute pour examiner ce diagramme. Nous aborderons les éléments spécifiques suivants.',
    'menu-where-downloadable-resources-live': 'Aquí es donde Los recursos descargables vivirán para cada curso.',
  },
  it: {
    'who-is-timothy-johnson': 'Che è Timothy Johnson?',
    'algorithm-home-page': '***let*** salami = (x) ***=>*** x ***>=*** 40',
    'take-minute-review-flowchart': 'Prendere un minuto per rivedere questo diagramma di flusso. Noi coprire gli elementi specifici prossimo.',
    'menu-where-downloadable-resources-live': 'Qui è dove Risorse scaricabili vivranno per ogni corso.',
  },

};

const changeLocale = (locale) => {
  locale_state.current_locale = locale;
  $(document).trigger('translatable',
    [document.querySelectorAll('[data-i18n]')]);
  alert(`Translating to: ${locale}`);
};

$(document).on('locale::set', (e, locale) => changeLocale(locale));

$(document).on('click', '[data-translate]', (event) => {
  const lang = $(event.target).closest('[data-translate]').attr('data-translate');
  $(document).trigger('locale::set', [lang]);
});

// 2. setup translator

const translate = (element) => {
  console.log(element);
  const $el = $(element);
  const locale = locale_state[locale_state.current_locale];
  const translatedText = locale[$el.attr('data-i18n')];
  $el
    .html(marked(translatedText))
    .attr('translated', true);
};

most.fromEvent('translatable', documentEvents)
    .map(params => params[1])
    .flatMap(elementArray => most.from(elementArray))
    .tap(translate)
    .drain();

// 3. setup mutation observer

const observer = new WebKitMutationObserver((mutations) => {
  console.log('WebKitMutationObserver');
  mutations.forEach(() => {
    $(document).trigger('translatable',
      [document.querySelectorAll('[data-i18n]:not([translated])')]);
  });
});

observer.observe(document,
  { attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
