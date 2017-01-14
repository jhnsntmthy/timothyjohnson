/* eslint-env browser, jquery */
import $ from './theme';
import './activity_lifecycle';
import './custom_elements';
import cheet from 'cheet.js';
import './section_prefetch';
import './hucklebuck';
import './progress';
import './scroll_to_top';
import { registerLanguages } from './lib/i18n/i18n';
import './404';

// registerLanguages() takes an array of languages this course supports
// the order should be the order of importance, the first element
// being the default language of the course.
registerLanguages(['en', 'fr', 'de', 'it', 'es', 'be', 'trump']);

const konami_pop = () => window.alert('Konàmi!');

cheet('↑ ↑ ↓ ↓ ← → ← → b a', konami_pop);

// cheet('↑ ↑ ↓ ↓ ', run_tranny );
$(document).trigger('activity::ready');
$(document).trigger('sections::prefetch');
