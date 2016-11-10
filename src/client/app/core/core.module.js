(function() {
  'use strict';

  angular
    .module('app.core', [
      'ui.router',
      'ui.bootstrap',
      'ngResource',
      'dcbImgFallback',
      'toastr',
      'blocks.logger',
      'blocks.router',
      'ig.linkHeaderParser',
      'infinite-scroll'
    ]);
})();
