/* eslint-env browser, jquery */
import $ from './theme';
import manifest from './section_manifest';

const { fetch, sections_prefetched } = window;

window.sections_prefetched = {};

const prefetchSections = (manifest) => {
  console.log(' => prefetchSections called');
  manifest.forEach((s) => {
    fetch(`/sections/${s.slug}.html`)
      .then(function(response) {
        return response.text()
      }).then(function(body) {
        window.sections_prefetched[s.slug] = body;
        console.log(`prefetch::done::${s.slug}`);
        $(document).trigger(`prefetch::done::${s.slug}`);
        return true;
      });
  });
};

$(document).on('sections::prefetch', () => prefetchSections(manifest));

export default null;
