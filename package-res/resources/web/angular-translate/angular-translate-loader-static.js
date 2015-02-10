/*!
 * angular-translate - v2.1.0 - 2014-09-04
 * http://github.com/PascalPrecht/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate').factory('$translateStaticFilesLoader', [
  '$q',
  '$http',
  function ($q, $http) {
    return function (options) {
      if (!options || (!angular.isString(options.prefix) || !angular.isString(options.suffix))) {
        throw new Error('Couldn\'t load static files, no prefix or suffix specified!');
      }
      var fileFormatAdapter = options.fileFormatAdapter;
      if (fileFormatAdapter !== undefined && !angular.isFunction(fileFormatAdapter)) {
        throw new Error('Couldn\'t load static files, fileFormatAdapter is not a function!');
      }
      var deferred = $q.defer();
      $http({
        url: [
          options.prefix,
          options.key,
          options.suffix
        ].join(''),
        method: 'GET',
        params: ''
      }).success(function (data) {
        deferred.resolve(fileFormatAdapter ? fileFormatAdapter(data) : data);
      }).error(function (data) {
        deferred.reject(options.key);
      });
      return deferred.promise;
    };
  }
]);