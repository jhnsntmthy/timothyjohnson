/* eslint-env browser, jquery */
import * as most from 'most';
import $ from 'jquery';
import marked from './marked';

const { fetch, WebKitMutationObserver } = window;

const documentEvents = {
  addListener: (type, lsnr) => $(document).on(type, lsnr),
  removeListener: (type, lsnr) => $(document).off(type, lsnr),
};

let current_locale = 'en';
const locale_strings = {
  en: {},
  de: {},
  fr: {},
  it: {},
  es: {},
  be: {},
  trump: {},
};


const changeLocale = (locale) => {
  current_locale = locale;
  $(document).trigger('translatable',
    [document.querySelectorAll('[data-i18n]')]);
  alert(`Translating to: ${locale}`);
};

$(document).on('locale::set', (e, locale) => changeLocale(locale));

$(document).on('click', '[data-translate]', (event) => {
  const lang = $(event.target).closest('[data-translate]').attr('data-translate');
  $(document).trigger('locale::set', [lang]);
});

const processDefaultLanguage = () => {
  $(document).trigger('translatable',
    [document.querySelectorAll('[data-i18n]')]);
};

const prefetchLanguages = () => {
  Object.keys(locale_strings).forEach((lang) => {
    fetch(`/lang/${lang}.json`)
      .then(response => response.json())
      .then((json) => {
        console.log('parsed json', json);
        locale_strings[lang] = json;
        processDefaultLanguage();
      })
      .catch(ex => console.log('parsing failed', ex));
  });
  // changeLocale(current_locale);
};

prefetchLanguages();

// 2. setup translator

const translate = (element) => {
  console.log(element);
  const $el = $(element);
  const locale = locale_strings[current_locale];
  const lang_key = $el.attr('data-i18n');
  const translatedText = locale[$el.attr('data-i18n')];
  console.log('translate', element, current_locale, locale, lang_key, translatedText);
  if (translatedText !== undefined) {
    $el
      .html(marked(translatedText))
      .attr('translated', true);
  } else {
    console.error('translate', element, current_locale, locale, lang_key, translatedText);
  }
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
