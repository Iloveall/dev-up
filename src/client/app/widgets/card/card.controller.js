(function() {
  'use strict';

  angular
    .module('app.widgets')
    .controller('Card', Card);

  Card.$inject = [];

  /* @ngInject */
  function Card() {
    var vm = this;
  }
})();
