'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AppmodalCtrl
 * @description
 * # AppmodalCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TutormodalCtrl', function ($filter, contactAdminFactory, $scope, $uibModalInstance, $uibModal) {

    $scope.tits = JSON.parse(contactAdminFactory.getTutorData());

    $scope.ugh = new Array();
    $scope.real = new Array();
    $scope.searchList = '';

    var shitData = $scope.tits.calArray;
    //console.log('LOOK');
    //console.log($scope.tits)

    $scope.ugh = shitData;

    var start = 2;
    var end = 3;
    for (var x = 0; x<$scope.ugh.length; x++) {
      $scope.ugh[x].time = start + ':00 - ' + end + ':00';
      start++;
      end++;
    }

    $scope.deleteTutor = function(tutorID) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/adminDash/terminatetutormodal.html',
        controller: 'TerminatetutormodalCtrl',
        size: 'sm',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then(function () {
          console.log("UIBModalInstance Success");
          contactAdminFactory.terminateTutor(tutorID);
          $uibModalInstance.close();
      }, function () {
          console.log("UIBModalInstance Dismiss");
      });
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
  });
