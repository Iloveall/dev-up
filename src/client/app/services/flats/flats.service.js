(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('flats', flats);

  flats.$inject = ['$resource'];

  /* @ngInject */
  function flats($resource) {

    return $resource('http://localhost:3000/flats', {}, {
      query: {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          transformResponse: function(data, headers){
              var response = {};
              response.data = JSON.parse(data);
              response.headers = headers();
              return response;
          }
      }
    });

  }

})();
