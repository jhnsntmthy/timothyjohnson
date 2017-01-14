/* eslint-env browser, jquery */
import $ from 'jquery';
import manifest from './section_manifest';
import './section_prefetch';
import './hucklebuck_buttons';

const { sections_prefetched } = window;


const renderSectionBySlug = (slug) => {
  console.log(`Rendering Section by Slug: ${slug}`);
  if (sections_prefetched[slug] !== undefined) {
    document.getElementById('content').innerHTML = sections_prefetched[slug];
    $(document).trigger('hucklebucked', [slug]);
  } else {
    document.getElementById('content').innerHTML = sections_prefetched['404'];
    $(document).trigger('404page');
  }
};

const renderSectionByNumber = (i) => {
  console.log(`Rendering Section by #${i}`);
  renderSectionBySlug(manifest[i].slug);
};

const hucklebuck = (slug_or_num) => {
  if (Number.isInteger(slug_or_num)) {
    renderSectionByNumber(slug_or_num);
  } else {
    renderSectionBySlug(slug_or_num);
  }
  $(document).trigger('post-hucklebucked', [slug_or_num]);
};

$(document).on('hucklebuck', (event, slug_or_num) => {
  hucklebuck(slug_or_num);
});

const loadFirstPage = () => {
  console.log('loading First Page');
  $(document).trigger('hucklebuck', [0]);
};

$(document).on(`prefetch::done::${manifest[0].slug}`, () => loadFirstPage());
