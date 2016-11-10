(function() {
  'use strict';

  angular
    .module('app.layout')
    .component('card', {
      templateUrl: '/app/widgets/card/card.html',
      bindings: {
        flat: '<'
      }
    });
})();
