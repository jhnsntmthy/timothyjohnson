/* eslint-env browser, jquery */
import $ from './theme';
import jQuery from './activity_lifecycle';
import './custom_elements';
import cheet from 'cheet.js';
import './section_prefetch';
import './hucklebuck';
import './progress';
import './scroll_to_top';



const konami_pop = () => alert('Konàmi!');

cheet('↑ ↑ ↓ ↓ ← → ← → b a', konami_pop );


//
// var content = document.getElementById("content");
// content.innerHTML = '<x-hola ref="somewhere nice"></x-hello>';


$(document).trigger('activity::ready');
$(document).trigger('sections::prefetch');
