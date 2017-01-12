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
        console.log(`prefetch:done:${s.slug}`);
        $(document).trigger(`prefetch:done:${s.slug}`);
        return true;
      });
  });
};

const renderPage = (i) => {
  console.log(`Rendering Page #${i}`);
  let content_div = document.getElementById("content");
  let body = window.sections_prefetched[manifest[i].slug];
  content_div.innerHTML = body;
};

$(document).on('sections:prefetch', () => prefetchSections(manifest));
$(document).on(`prefetch:done:${manifest[0].slug}`, () => renderPage(0));

export { manifest };
export { renderPage };
