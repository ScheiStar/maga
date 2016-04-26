'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AppmodalCtrl
 * @description
 * # AppmodalCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('TutormodalCtrl', function ($filter, contactAdminFactory, $scope, $uibModalInstance) {

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
      //console.log('YEA');
      //console.log(tutorID);
      contactAdminFactory.terminateTutor(tutorID);
      $uibModalInstance.close();
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
  });
