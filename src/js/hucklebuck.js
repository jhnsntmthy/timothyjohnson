/* eslint-env browser, jquery */
import $ from 'jquery';
import manifest from './section_manifest';
import './section_prefetch';
import './hucklebuck_buttons';

const { fetch, sections_prefetched } = window;


const renderSectionByNumber = (i) => {
  console.log(`Rendering Section by #${i}`);
  renderSectionBySlug(manifest[i].slug);
};

const renderSectionBySlug = (slug) => {
  console.log(`Rendering Section by Slug: ${slug}`);
  let content_div = document.getElementById("content");
  content_div.innerHTML = window.sections_prefetched[slug];
  $(document).trigger('hucklebucked', [slug]);
}

const hucklebuck = (slug_or_num) => {
  if (Number.isInteger(slug_or_num)) {
    renderSectionByNumber(slug_or_num);
  } else {
    renderSectionBySlug(slug_or_num);
  }
  $(document).trigger('post-hucklebucked', [slug_or_num]);
};

$(document).on('hucklebuck', (event, slug_or_num) => {
  hucklebuck(slug_or_num)
});

const loadFirstPage = () => {
  console.log('loading First Page');
  $(document).trigger('hucklebuck', [0]);
}

$(document).on(`prefetch::done::${manifest[0].slug}`, () => loadFirstPage());
