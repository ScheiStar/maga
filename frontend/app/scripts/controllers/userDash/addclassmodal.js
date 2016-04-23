'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AddclassmodalCtrl
 * @description
 * # AddclassmodalCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('AddclassmodalCtrl', function ($scope, $state, $uibModalInstance, userFactory) {
    console.log('in this bitch');

    // $scope.addClass = function() {
    //   var request_data = {
    //     'userID': '',
    //     'className': $scope.myClassType,
    //     'classNum': ,
    //     'requestType': 'Add'
    //   };
    //   userFactory.tutorRequest(request_data);
    //   $state.go("userDashClass");
    //   $uibModalInstance.dismiss('cancel');
    // }
  });
