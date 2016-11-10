(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('header', header);

  header.$inject = [];

  /* @ngInject */
  function header() {
    var directive = {
      templateUrl: '/app/layout/header/header.html',
      controller: 'Header',
      controllerAs: 'vm',
      link: link,
      restrict: 'EA',
      replace: true
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }
})();
