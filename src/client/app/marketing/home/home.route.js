(function() {
  'use strict';

  angular
    .module('marketing.home')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates(user) {
    return [
      {
        state: 'home',
        config: {
          url: '/',
          templateUrl: 'app/marketing/home/home.html',
          controller: 'HomeController',
          controllerAs: 'vm',
          title: 'Home page'
        }
      }
    ];
  }
})();
