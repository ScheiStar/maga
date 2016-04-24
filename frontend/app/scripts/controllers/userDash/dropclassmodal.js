'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:DropclassmodalCtrl
 * @description
 * # DropclassmodalCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('DropclassmodalCtrl', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
  });
