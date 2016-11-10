(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('filterPanel', filterPanel);

  filterPanel.$inject = [];

  /* @ngInject */
  function filterPanel() {
    var directive = {
      templateUrl: '/app/widgets/filter-panel/filter-panel.html',
      controller: 'FilterPanel',
      controllerAs: 'vm',
      link: link,
      restrict: 'EA',
      replace: true,
      scope: {
        filters: '=',
        defaults: '='
      }
    };
    return directive;

    function link(scope, element, attrs) {

    }
  }
})();
