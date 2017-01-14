/* eslint-env browser, jquery */
import $ from 'jquery';
import './hucklebuck_buttons';
// import createHistory from './prehistoric/history';

// const { push, history } = createHistory();

// history.observe(dat => console.log('HISTORICAL', dat));

const sections_prefetched = {};
const sections_order = {};
$(document).on('section::loaded', (e, slug, order, body) => {
  sections_prefetched[slug] = body;
  sections_order[order] = slug;
  console.log('sections:', sections_order, sections_prefetched);
});


const renderSectionBySlug = (slug) => {
  console.log(`Rendering Section by Slug: ${slug}`);
  if (sections_prefetched[slug] !== undefined) {
    // push('/'+slug, { state: slug });
    document.getElementById('content').innerHTML = sections_prefetched[slug];
    $(document).trigger('hucklebucked', [slug]);
  } else {
    document.getElementById('content').innerHTML = sections_prefetched['404'];
    $(document).trigger('404page');
  }
};

const renderSectionByNumber = (i) => {
  console.log(`Rendering Section by #${i}`);
  renderSectionBySlug(sections_order[i]);
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
