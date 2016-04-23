'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AddclassmodalCtrl
 * @description
 * # AddclassmodalCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AddclassmodalCtrl', function ($scope, $state, $uibModalInstance) {
    console.log('in this bitch');

    $scope.addClass = function() {
      //TODO: post request
      $state.go("userDashClass");
      $uibModalInstance.dismiss('cancel');
    }
  });
