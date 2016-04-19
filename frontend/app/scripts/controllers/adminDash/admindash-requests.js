'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AdmindashRequestsCtrl
 * @description
 * # AdmindashRequestsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AdmindashRequestsCtrl', function ($scope, userFactory) {

    $scope.signOut = function() {
      userFactory.signOut();
    };
  });
