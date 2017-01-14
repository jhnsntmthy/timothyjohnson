/* eslint-env browser, jquery */
import $ from './theme';
import './activity_lifecycle';
import './custom_elements';
import cheet from 'cheet.js';
import './section_prefetch';
import './hucklebuck';
import './progress';
import './scroll_to_top';
import './i18n';
import './404';


const konami_pop = () => window.alert('Konàmi!');

cheet('↑ ↑ ↓ ↓ ← → ← → b a', konami_pop);

// cheet('↑ ↑ ↓ ↓ ', run_tranny );
$(document).trigger('activity::ready');
$(document).trigger('sections::prefetch');
