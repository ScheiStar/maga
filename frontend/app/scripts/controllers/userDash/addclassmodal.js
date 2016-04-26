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
    $scope.addClass = function(classInfo) {
      var request_data = {
        'userID': userFactory.parseToken(userFactory.getToken()).userID,
        'className': classInfo.myClassType,
        'classNum': classInfo.myText,
        'grade': classInfo.myGrade,
        'requestType': 'Add'
      };

      userFactory.tutorRequest(request_data);
      $state.go("userDashClass");
      $uibModalInstance.dismiss('cancel');
    }
  });
