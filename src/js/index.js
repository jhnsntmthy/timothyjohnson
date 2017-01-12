/* eslint-env browser, jquery */
import $ from './theme';
import jQuery from './navigation';
import './custom_elements';
import cheet from 'cheet.js';
import {manifest, renderPage} from './section_prefetch';


const konami_pop = () => alert('Konàmi!');

cheet('↑ ↑ ↓ ↓ ← → ← → b a', konami_pop );


//
// var content = document.getElementById("content");
// content.innerHTML = '<x-hola ref="somewhere nice"></x-hello>';


$(document).trigger('activityReady');
$(document).trigger('sections:prefetch');
