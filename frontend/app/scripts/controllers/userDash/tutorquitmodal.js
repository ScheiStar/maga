'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:TutorquitmodalCtrl
 * @description
 * # TutorquitmodalCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TutorquitmodalCtrl', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
  });
