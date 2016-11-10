(function() {
  'use strict';

  angular
    .module('marketing.home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'pagination', 'flats'];
  /* @ngInject */
  function HomeController($scope, pagination, flats) {
    var vm = this;

    vm.flats = {
      isFirstLoaded: false,
      isLoading: false,
      defaults: {
        _page: 1
      }
    };

    vm.loadMore = loadMore;

    $scope.$watch('vm.flats.params', function(data, oldData) {
      if (!_.isEqual(data, oldData)) {
        get();
      }
    }, true);


    activate();

    function activate() {
      get();
    }

    function get() {
      vm.flats.isLoading = true;
      flats.query(vm.flats.params).$promise
        .then(function(response) {
          vm.flats.isLoading = false;
          vm.flats.isFirstLoaded = true;
          vm.flats.data = response.data;

          console.log(response.headers.link);
          vm.flats.links = pagination.parse(response.headers.link);
        });
    }

    function loadMore(url) {
      vm.flats.isLoading = true;
      pagination.query(url)
        .get().$promise
        .then(function(response) {
          vm.flats.isLoading = false;
          vm.flats.data = vm.flats.data.concat(response.data);
          vm.flats.links = pagination.parse(response.headers.link);
          console.log(response.headers.link);
        });
    }

  }
})();
