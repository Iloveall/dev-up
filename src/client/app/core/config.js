(function() {
  'use strict';

  angular
    .module('app')
    .config(function(toastrConfig) {
      angular.extend(toastrConfig, {
        timeOut: 2000
      });
    });

})();
