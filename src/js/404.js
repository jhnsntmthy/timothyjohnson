/* eslint-env browser, jquery */
import $ from 'jquery';

const fourOhFour = () => {
  console.log('Running 404 page');
}

$(document).on('404page', () => fourOhFour());
export default fourOhFour;
