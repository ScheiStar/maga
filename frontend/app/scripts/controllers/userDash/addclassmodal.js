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

    $scope.addClass = function(classInfo) {
      var request_data = {
        'userID': '11111111',
        'className': classInfo.myClassType,
        'classNum': classInfo.myText,
        'requestType': 'Add'
      };
      userFactory.tutorRequest(request_data);
      $state.go("userDashClass");
      $uibModalInstance.dismiss('cancel');
    }
  });
