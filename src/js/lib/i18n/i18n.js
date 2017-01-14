/* eslint-env browser, jquery */
/* eslint no-trailing-spaces: 0 */
import prefetch from './prefetch_languages';
import setDefaultLocale from './change_locale';
import './mutation_observer';

// 1. Receive an array of languages to prefetchLanguages
// assuming the first one is the default language
// send them to the prefetch function
const registerLanguages = (languages = ['en']) => {
  setDefaultLocale(languages[0]);
  prefetch(languages);
};

export { registerLanguages };
// 2. Register the after-prefetch callback once the first language
// is loaded and make sure that the current translation renders for all
// current content nodes


// 3. Setup the mutation observer for all future changes to the content
