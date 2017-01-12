/* eslint-env browser, jquery */
import $ from 'jquery';

const closeTheActivity = () => {
  window.close();
}

$(document).on('click','#trump', function(event){
	$(document).trigger('activity::complete', [{close: true}]);
});

$(document).on('window:close', () => closeTheActivity());

window.onbeforeunload = function(event) {
  $(document).trigger('activity::breakdown', [ progress ]);
  return null;
};
