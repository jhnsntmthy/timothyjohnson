/* eslint-env browser, jquery */
import $ from 'jquery';

const { fetch } = window;

const prefetch = (language_list) => {
  language_list.forEach((locale) => {
    fetch(`/lang/${locale}.json`)
      .then(response => response.json())
      .then((json) => {
        // console.log('Prefetched Language JSON', locale, json);
        $(document).trigger('translation::loaded', [locale, json]);
        $(document).trigger(`translation::loaded::${locale}`, [json]);
      })
      .catch(ex => console.log('parsing failed', ex));
  });
  // changeLocale(current_locale);
};

export default prefetch;
