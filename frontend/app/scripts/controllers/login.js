'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('LoginCtrl', function ($scope) {

    console.log('inside controller');
    $scope.master = {};
    $scope.email = '';

    $scope.update = function(user) {
      $scope.master = angular.copy(user);
    };

  });
