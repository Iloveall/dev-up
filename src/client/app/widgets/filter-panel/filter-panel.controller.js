(function() {
  'use strict';

  angular
    .module('app.widgets')
    .controller('FilterPanel', FilterPanel);

  FilterPanel.$inject = ['$scope'];

  /* @ngInject */
  function FilterPanel($scope) {
    var vm = this;

    vm.model = $scope.defaults;

    $scope.$watch('vm.model', function(data, oldData) {
      formatted(data);
    }, true);

    function formatted(data) {
      var params = angular.copy(data);

      _.forEach(params, function(item, key) {
        if (!item) {
          delete params[key];
        }
      });

      if (params.photos) {
        params.photos_like = '[/^\s*\d*\s*$/]';
        delete params['photos'];
      }
      $scope.filters = params;
    }

  }
})();
