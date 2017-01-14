/* eslint-env browser, jquery */
import $ from 'jquery';
import { setLocale, getLocale, translations } from './translate';

const changeLocale = (locale) => {
  if (locale === getLocale()) {
    console.warn('Locale is the SAME (not changing)', locale);
    return;
  }
  if (getLocale() !== '') {
    // only run this when switching from one language to next
    // never alert if this is the first "default" language
    alert(`Changing translation to: ${locale}`);
  }
  setLocale(locale);
  $(document).trigger('translatable',
    [document.querySelectorAll('[data-i18n]')]);
};

const setDefault = (locale) => {
  if (translations[locale] !== undefined) {
    // the translation is loaded, go ahead and switch
    $(document).trigger('locale::set', [locale]);
  } else {
    // the translation is being loaded, switch when done loading
    $(document).on(`translation::loaded::${locale}`, () => {
      console.log(`translation::loaded::${locale}`);
      changeLocale(locale);
    });
  }
  return locale;
};

$(document).on('locale::set', (e, locale) => changeLocale(locale));

$(document).on('click', '[data-translate-to]', (event) => {
  const locale = $(event.target).closest('[data-translate-to]').attr('data-translate-to');
  $(document).trigger('locale::set', [locale]);
});

export default setDefault;
