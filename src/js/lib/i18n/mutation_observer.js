/* eslint-env browser, jquery */
import $ from 'jquery';

const observer = new MutationObserver((mutations) => {
  console.log('MutationObserver');
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

export default null;
