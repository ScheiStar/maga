'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:TerminatetutormodalCtrl
 * @description
 * # TerminatetutormodalCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TerminatetutormodalCtrl', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close();
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
  });
