/* eslint-env browser, jquery */
import $ from 'jquery';
import './hucklebuck';
import './404';

const { fetch } = window;

const loadFirstPage = () => {
  console.log('loading First Page');
  $(document).trigger('hucklebuck', [0]);
};

const prefetchSections = (manifest) => {
  console.log(' => prefetchSections called');
  $(document).on(`section::loaded::${manifest[0].slug}`, loadFirstPage);
  manifest.forEach((s, order) => {
    fetch(`/sections/${s.slug}.html`)
      .then(response => response.text())
      .then((body) => {
        $(document).trigger('section::loaded', [s.slug, order, body]);
        console.log(`section::loaded::${s.slug}`);
        $(document).trigger(`section::loaded::${s.slug}`);
        return true;
      });
  });
};

export default prefetchSections;
