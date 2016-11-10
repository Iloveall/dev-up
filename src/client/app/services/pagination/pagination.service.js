(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('pagination', pagination);

  pagination.$inject = ['$resource'];

  /* @ngInject */
  function pagination($resource) {

    var service = {
      parse: parse,
      query: query
    };

    return service;

    function parse(header) {
      if (header.length == 0) {
        throw new Error("input must not be of zero length");
      }

      // Split parts by comma
      var parts = header.split(',');
      var links = {};
      // Parse each part into a named link
      _.each(parts, function(p) {
        var section = p.split(';');
        if (section.length != 2) {
          throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
      });

      return links;
    }

    function query(url) {
      return $resource({},{}, {
        get: {
          method: 'GET',
          url: url,
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

  }

})();
